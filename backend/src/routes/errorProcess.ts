import express from "express";

export const sendBackErrorMessage = (
    req: express.Request,
    res: express.Response,
    error: Error
) => {
    console.error(`ERROR - (${req.method})/services${req.path}/error: ${error}`);
    res.status(400).send(error.message);
};