import {Frozen, Injectable} from "src/utils/decorators";
import {Op, Sequelize, Transaction} from "sequelize";
import {Customer} from "src/models/customer.model";
import {Schedule} from "src/models/schedule.model";

@Frozen()
@Injectable()
export class ScheduleService {
    constructor(private sqlService: Sequelize) {
    }

    getAll() {
        return Schedule.findAll();
    }
    async createSchedule(schedule: any) {
        const t: Transaction = await this.sqlService.transaction();
        console.log(schedule);
        const {repeatedDay,start_date,end_date} = schedule;
        delete schedule.repeatedDay;
        let currDate = new Date(start_date);
        const endDate= new Date(end_date);
        console.log({start:start_date,end: end_date});
        try {
            if(repeatedDay.length == 0){
                await Schedule.create(schedule);
            }
            else{
                while (currDate <= endDate) {
                    if(repeatedDay.includes(currDate.getDay())){
                        let currSchedule = {...schedule};
                        currSchedule.start_date = currDate;
                        currSchedule.end_date = currDate;
                        await Schedule.create(currSchedule);
                    }
                    currDate = new Date(currDate.setDate(currDate.getDate() + 1));
                }
            }
            await t.commit();
            return Schedule.findAll();
        } catch (error) {
            console.log(error);
            await t.rollback();
            throw error;
        }
    }
    async updateSchedule(schedule: any) {
        await Schedule.upsert(schedule);
        console.log(Schedule.findAll());
        return Schedule.findAll();
    }
    async deleteSchedule(schedule: any) {
        const t: Transaction = await this.sqlService.transaction();

        try {
            await Schedule.destroy({
                where: {
                    id: schedule.id,
                },
                transaction: t,
            });
            const remainingSchedules = await Schedule.findAll({transaction: t});
            await t.commit();

            return remainingSchedules;
            console.log("delete")
        } catch (error) {
            console.log(error);
            await t.rollback();
            throw error;
        }
    }

}