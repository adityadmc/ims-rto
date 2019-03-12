import { Request, Response, NextFunction } from "express";
import { getStorageContractInstance } from "../../config/blockchain";
import { APISuccessResponse } from "../../responses";
import moment from 'moment';

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export async function checkAuthorityHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const username = req.body.username;
        const contractInstance = await getStorageContractInstance();
        const dataStr = await contractInstance.display_data.call(username);
        let isAuthorized = false;
        if (!dataStr) {
            return res.send(new APISuccessResponse({
                isAuthorized
            }))
        }
        const data = JSON.parse(dataStr);
        isAuthorized = data.authorityToDrive === req.body.authorityToDrive;
        return res.send(new APISuccessResponse({
            isAuthorized
        }))
    }
    catch (err) {
        return next(err);
    }
}
