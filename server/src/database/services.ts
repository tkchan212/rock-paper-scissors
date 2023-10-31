import prismaClient from "../database";
import { getNowInSecond } from "../utils/database";
import {v4 as uuidv4} from 'uuid';
import { makeStdErr } from "../exceptions/HttpError";
export default class Services {
    match = prismaClient.match;
    move = prismaClient.move;
    getMatchBySelector = async (selector) => {
        const match = await this.match.findFirst({
            where: { selector },
            include: {
                moves: true
            }
        })
        if (!match) throw makeStdErr("INVALID_DATA")
        return match
    }
    addMove = async (matchID, username, action) => {
        if (!await this.validateMatch(matchID)) throw makeStdErr("INVALID_DATA")
        await this.move.create({
            data: {
                username,
                action,
                timestamp: getNowInSecond(),
                matchId: matchID
            }
        })
    }
    createMatchwithMove = async (deadline, username, action) => {
        if (!this.isLaterthanNow(deadline)) throw makeStdErr("INVALID_DATA")
        const data = {
            deadline,
            selector: uuidv4(),
            moves: {
                create: [{
                    username,
                    action,
                    timestamp: getNowInSecond()
                }]
            },
        }
        try {
            const match = await this.match.create({
                data,
                select: {
                    id: true,
                    selector: true,
                    deadline: true,
                    moves: {
                        select: {
                            username: true,
                            action: true,
                            timestamp: true
                        }
                    }
                }
            })
            return match
        }
        catch (err) {
            console.log(err)
            throw makeStdErr("INVALID_DATA")
        }
    }
    validateMatch = async (matchID) => {
        const match = await this.match.findFirst({
            where: { id: matchID },
            include: {
                moves: true
            }
        })
        if (!match) throw makeStdErr("INVALID_DATA")
        const move_num = match.moves.length
        const match_deadline = match.deadline
        return (!this.isLaterthanNow(match_deadline) && move_num < 2)
    }      
    isLaterthanNow = (time) => {
        return (time > getNowInSecond())
    }

}
