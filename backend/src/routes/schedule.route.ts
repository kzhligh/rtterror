import express, {Request, Response} from "express";
import {ScheduleService} from "src/services/schedule.service";
import {Frozen, Injectable, ServiceLocator} from "src/utils/decorators";

@Frozen()
@Injectable()
class ScheduleController {
    constructor(private scheduleService: ScheduleService) {
    }

    getRoutes(): express.Router {
        return express
            .Router()
            .get('/', this.getAllSchedule())
            .post('/salary', this.Salary())
            .post('/', this.createSchedule())
            .put('/', this.updateSchedule())
            .delete('/', this.deleteSchedule());

    }
    private getAllSchedule() {
        return async (_req: Request, res: Response) => {
            try {
                const schedules = await this.scheduleService.getAll();
                res.status(200).send(schedules);
            } catch (error) {
                res.status(400).send(error);
            }
        };
    }

    private Salary() {
        return async (req: Request, res: Response) => {
            try {
                const appointmentJsons = await this.scheduleService.salaryCalculation(req.body);
                res.status(200).send(appointmentJsons);
            } catch (error) {
                res.status(400).send(error);
            }
        };
    }

    private createSchedule() {
        return async (req: Request, res: Response) => {
            try {
                const schedule = await this.scheduleService.createSchedule(req.body);
                res.status(201).send(schedule);
            } catch (error) {
                res.status(400).send(error);
            }
        };
    }

    private updateSchedule() {
        return async (req: Request, res: Response) => {
            try {
                const schedules = await this.scheduleService.updateSchedule(
                    req.body
                );
                res.status(200).send(schedules);
            } catch (error) {
                res.status(400).send(error);
            }
        };
    }

    private deleteSchedule() {
        return async (req: Request, res: Response) => {
            try {
                const remainingSchedule = await this.scheduleService.deleteSchedule(
                    req.body
                );
                res.status(200).send(remainingSchedule);
            } catch (error) {
                res.status(400).send(error);
            }
        };
    }
    private getScheduleById() {
        return async (req: Request, res: Response) => {
            const { id } = req.params;

            try {
                const schedule = await this.scheduleService.getScheduleById(id);
                res.status(200).send(schedule);
            } catch (error) {
                res.status(400).send(error);
            }
        };
    }
}

export const scheduleRouter = ServiceLocator.getInstance()
    .resolve<ScheduleController>(ScheduleController)
    .getRoutes();
