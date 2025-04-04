import ConfigModule from "./ConfigModule.js";
let config = ConfigModule();
const verbose = config.get('verbose');
const debug = (s) => {
        if (verbose === true) {
            console.error(s)
            if (typeof s == "[object Object]") {
                console.log(Reflect.getPrototypeOf(s))
            }
        }
}
export default debug;
