
/**
 *  The Context defines the interface of interest to clients.
 */

export class Employee {

    //Data member
    private strategy: SalaryCalculation;

    //Constructors
    
    constructor(strategy: SalaryCalculation)
    {
        this.strategy = strategy;
    }

    //setting strategy object at runtime
    public setStrategy(strategy: SalaryCalculation)
    {
        this.strategy = strategy;
    }

    //Business logic 

    public calculateSalary(): number
    {
        const result = this.strategy.calculate();
        console.log(result);
        return result;
    }

    public getParams(): any
    {
        const result = this.strategy.params();
        console.log(result);
        return result;
    }

}





abstract class SalaryCalculation 
{
    //Data members
  protected parameters : Parameter[]=[];

    //Constructors
    SalaryCalculation() {
        console.log('salary calculation Constructors');
    }

    //Accessor 
    public getParameters() {return this.parameters.copyWithin;}

    //Other Methods 
    public abstract calculate() :number ;

    public abstract params(): any;

}

class TimeBasedCalculation extends SalaryCalculation
{
    //Data members
    public time = new TimeParameter("TimeParameter",1,2,3);
    public salaryRate = new SalaryRateParameter("SalaryRateParameter",1,2,3);
    

     //Constructor 
     constructor(time:TimeParameter, salaryRate: SalaryRateParameter)
     {
         super();
         this.time = time;
            this.parameters[0] = this.time;
         this.salaryRate = salaryRate;
            this.parameters[1] = this.salaryRate;
     }


     //Other methods
     calculate(){ return this.time.getValue() * this.salaryRate.getValue();}

     params(){ return {param1: this.time.getValue(), param2: this.salaryRate.getValue() , name: 'TimeBasedCalculation'}; }

}

class ServiceBasedCalculation extends SalaryCalculation
{
    //Data members
    public fixedPrice = new FixedPriceParameter("FixedPriceParameter",1,2,3);
    public numOfServices = new NumOfServicesParameter("NumOfServicesParameter",1,2,3);
    

     //Constructor 
     constructor(fixedPrice:FixedPriceParameter, numOfServices: NumOfServicesParameter)
     {
         super();
         this.fixedPrice = fixedPrice;
            this.parameters[0] = this.fixedPrice;
         this.numOfServices = numOfServices;
            this.parameters[1] = this.numOfServices;
     }

     //Other methods
     calculate(){ return this.fixedPrice.getValue() * this.numOfServices.getValue();}
     params(){ return {param1: this.numOfServices.getValue(), param2: this.fixedPrice.getValue() , name: 'ServiceBasedCalculation'}; }
}

class CommissionBasedCalculation extends SalaryCalculation
{
    //Data members
    public serviceCost = new ServiceCostParameter("ServiceCostParameter",1,2,3);
    public commissionPercentage = new CommissionPercentageParameter("CommissionPercentageParameter",1,2,3);
    

     //Constructor 
     constructor(serviceCost:ServiceCostParameter, commissionPercentage: CommissionPercentageParameter)
     {
         super();
         this.serviceCost = serviceCost;
            this.parameters[0] = this.serviceCost;
         this.commissionPercentage = commissionPercentage ;
            this.parameters[1] = this.commissionPercentage;
     }

     //Other methods
     calculate(){ return this.serviceCost.getValue()* (this.commissionPercentage.getValue()/100);}

     params(){ return {param1: this.serviceCost.getValue(), param2: this.commissionPercentage.getValue()/100 , name: 'CommissionBasedCalculation'}; }


}





/**  Parameter Class */
 abstract class Parameter
{
    //Data members (hours)
    public min =0;
    public max =24
    public value=1;


    //Constructors
    constructor(min: number, max: number, value: number)
    {
        this.min= min;
        this.max= max;
        this.value = value;
    }

    //Mutator
    public setValue(value:number)
    {
        if(value < this.min)
        {
            console.log("Value is less than minimum");
            return;
        }
        if (value > this.max)
        {
            console.log("Value is more than maximum");
            return;
        }
        this.value = value;
    }

    //Accessor
    public getValue()
    {
        return this.value;
    }

}

class TimeParameter extends Parameter
{
    //Data members (hours)
    public name ='';

    
    //Constructors
    constructor(name: string, min: number, max: number, value: number)
    {
        super(min, max, value);
        this.name = name;
    }
}

class SalaryRateParameter extends Parameter
{
    //Data members (Comission)
    public name1 ='';

    //Constructors
    constructor(name1: string, min1: number, max1: number, value1: number)
    {
        super(min1, max1, value1);
        this.name1 = name1;
    }
}

class FixedPriceParameter extends Parameter
{
    //Data members (Fixed Price)
    public name3 = '';

    //Constructors
    constructor(name3: string, min3: number, max3: number, value3: number)
    {
        super(min3, max3, value3);
        this.name3 = name3;
    }
}

class NumOfServicesParameter extends Parameter
{
    //Data members (Number Of Services)
    public name2 = '';

    //Constructors
    constructor(name2: string, min2: number, max2: number, value2: number)
    {
        super(min2, max2, value2);
        this.name2 = name2;
    }
}

class ServiceCostParameter extends Parameter
{
    //Data members (Service Cost)
    public name4 = '';

    //Constructors
    constructor(name4: string, min4: number, max4: number, value4: number)
    {
        super(min4, max4, value4);
        this.name4 = name4;
    }

}

class CommissionPercentageParameter extends Parameter
{
    //Data members (Commission Percentage)
    public name5 = '';

    //Constructors
    constructor(name5: string, min5: number, max5: number, value5: number)
    {
        super(min5, max5, value5);
        this.name5 = name5;
    }
}

//Factory Method

export class SalaryCalculationFactory
{
    static createObject(CalculationMethod: string, appointmentsList: any, params:any) : SalaryCalculation {
        console.log(CalculationMethod);
        if( CalculationMethod === "TimeBasedCalculation" )
        {
            // duration
            var totalDuration =  appointmentsList.reduce((acc, item) => acc + (1*item.appduration), 0)/60;
            console.log({totalDuration:totalDuration});
            return new TimeBasedCalculation(new TimeParameter("TimeParameter",1,24,totalDuration),new SalaryRateParameter("SalaryRateParameter",1,500,+params));
        }
        else if(CalculationMethod === "ServiceBasedCalculation")
        {
            // number of service
            console.log({number: appointmentsList.length});
            return new ServiceBasedCalculation(new FixedPriceParameter("FixedPriceParameter",1,1000,+params),new NumOfServicesParameter("NumOfServicesParameter",1,1000,appointmentsList.length));
        }
        else {
            // price
            var totalprice =  appointmentsList.reduce((acc, item) => acc + 1*item.serviceprice, 0);
            console.log({totalprice: totalprice});
            return new CommissionBasedCalculation(new ServiceCostParameter("ServiceCostParameter",1,1000,totalprice),new CommissionPercentageParameter("CommissionPercentageParameter",1,100,+params));
        }
    }
}

function nameOfSalaryCalculation(_CalculationMethod: any,_string: any) {
throw new Error("Function not implemented.");
}
