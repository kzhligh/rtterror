import ServiceModel from "./service";

const syncTables = async () => {
    try {
        await Promise.all([
            ServiceModel.sync({alter: true})
        ]);
    } catch (error) {
        console.error(error)
    }
}
export default syncTables;