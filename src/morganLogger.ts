import morgan from "morgan";
import { pathOr } from "ramda";
import moment from "moment";
import jwt from "jsonwebtoken";

export const morganLogger = (express) => {
  morgan.token("mutationName", (req) => {
    const queryString = JSON.stringify(pathOr("", ["body", "query"], req))
      .replace(/\n/g, "")
      .replace(/\\n/g, "")
      .replace(/\s+/g, " ");

    if (queryString && queryString.match(/{\s{1}(\w+)/)) {
      if (queryString.match(/{\s{1}(\w+)/).length > 1)
        return `"mutationName":"${queryString.match(/{\s{1}(\w+)/)[1]}",`;
      return " ";
    }
    return " ";
  });
  morgan.token(
    "query",
    (req) =>
      `"query":${JSON.stringify(pathOr("", ["body", "query"], req))
        .replace(/\n/g, "")
        .replace(/\\n/g, "")
        .replace(/\s+/g, " ")},`
  );
  morgan.token(
    "variables",
    (req) =>
      `"variables":${JSON.stringify(pathOr(null, ["body", "variables"], req))}}`
  );
  morgan.token("user", (req) => {
    if (req.get("authorization") && req.get("authorization") !== "null") {
      try {
        const jwtObject = jwt.verify(
          req.get("authorization").replace("Bearer ", ""),
          process.env.GOLDWARE_APP_SECRET
        );
        return `"userId":${JSON.stringify(jwtObject)},`;
      } catch (error) {
        return " ";
      }
    }
    return " ";
  });
  morgan.token("appversion", (req) => {
    if (req.get("appversion") && req.get("appversion") !== "null") {
      try {
        const appversion = req.get("appversion");
        return `"appversion":"${appversion}",`;
      } catch (error) {
        return '"appversion": "1.0.0",';
      }
    }
    return '"appversion": "1.0.0",';
  });
  morgan.token("device", (req) => {
    if (req.get("device") && req.get("device") !== "null") {
      try {
        const device = req.get("device");
        return `"device":"${device}",`;
      } catch (error) {
        return " ";
      }
    }
    return " ";
  });
  morgan.token("publicip", (req) => {
    if (req.get("publicip") && req.get("publicip") !== "null") {
      try {
        const publicip = req.get("publicip");
        return `"publicip":"${publicip}",`;
      } catch (error) {
        return " ";
      }
    }
    return " ";
  });
  morgan.token(
    "date",
    () => `{"date":"${moment().format("YYYY-MM-DD hh:mm:ss")}",`
  );

  /*
   * Request Log
   */
  express.use(
    morgan(
      ":date :appversion :device :publicip :user :mutationName :query :variables",
      {
        // skip: req =>
        //   pathOr('', ['body', 'query'], req).substring(0, 8) !== 'mutation',
        skip(req) {
          return pathOr("", ["body", "query"], req) === "";
        },
        stream: {
          write(message) {
            // cloudWatchLogger.info(`req:${message}`, JSON.parse(message))
          },
        },
      }
    )
  );

  /*
   * Response Log
   */
  const logResponseBody = (req, res, next) => {
    const oldWrite = res.write;
    const oldEnd = res.end;
    const chunks = [];

    res.write = (...args) => {
      chunks.push(Buffer.from(args[0]));
      oldWrite.apply(res, args);
    };
    res.end = (...args) => {
      if (args[0]) {
        chunks.push(Buffer.from(args[0]));
      }
      const body = Buffer.concat(chunks).toString("utf8");

      if (pathOr("", ["body", "query"], req) !== "") {
        // cloudWatchLogger.info(`res:${body}`, JSON.parse(body))
      }

      oldEnd.apply(res, args);
    };

    next();
  };

  express.use(logResponseBody);
};
