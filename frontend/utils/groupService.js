import _groupBy from "lodash/groupBy";
import _cloneDeep from "lodash/cloneDeep";

const groupService = (serviceListResponse) => {
    const serviceArray = _groupBy(serviceListResponse, 'service_code');
    const serviceList = [];
    let item, durationPriceList, durationPriceItem;
    const MS_H_CONVERSION_RATE = 60000;
    for (const serviceCode in serviceArray) {
        item = _cloneDeep(serviceArray[serviceCode][0]);
        item.service_code = serviceCode;
        delete item.duration;
        delete item.price;
        durationPriceList = [];
        for (const insideItem of serviceArray[serviceCode]) {
            durationPriceItem = {};
            durationPriceItem.id = insideItem.id;
            durationPriceItem.duration = (insideItem.duration * 1 / MS_H_CONVERSION_RATE);
            durationPriceItem.price = insideItem.price;
            durationPriceList.push(durationPriceItem);
        }
        item.durations_prices = durationPriceList;
        serviceList.push(item);
    }
    return serviceList;
};
export default groupService;