import { makeStdErr } from "../exceptions/HttpError";
import { handleError } from "../middlewares/errorHandling";
import { Controller } from "../types/request"
import Services from "../database/services";
import { safeResJson } from "../utils/response";

export default class MatchController {
    services = new Services();
    getMatchBySelector : Controller = handleError(async (req, res, next) => {
            const { selector } = req.params;
            const match = await this.services.getMatchBySelector(selector);
            safeResJson({match}, res);
        }
    )
    addMove : Controller = handleError(async (req, res, next) => {
            const { selector } = req.params;
            const { username, action } = req.body;
            const matchID = (await this.services.getMatchBySelector(selector)).id;
            await this.services.addMove(matchID, username, action);
            const match = this.services.getMatchBySelector(selector);
            safeResJson({match}, res);
        }
    )
    createMatchwithMove : Controller = handleError(async (req, res, next) => {
            const { deadline, username, action } = req.body;
            const match = await this.services.createMatchwithMove(deadline, username, action);
            safeResJson({match}, res);
        }
    )
}