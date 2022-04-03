
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

}





/**  Parameter Class */
 abstract class Parameter
{
    //Data member
    public parameterName = "";

    //Constructors
    constructor(parameterName: string)
    {
        this.parameterName = parameterName;
    }
    
    //Accessor 
    public getParameterName()
    {
        return this.parameterName;
    }

}

class TimeParameter extends Parameter
{
    //Data members (hours)
    private min =0;
    private max =24
    private value=1;

    
    //Constructors
    constructor(name: string, min: number, max: number, value: number)
    {
        super(name);
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

class SalaryRateParameter extends Parameter
{
    //Data members (Salary Rate)
    private min1 =0;
    private max1 =100;
    private value1=13.50;

    //Constructors
    constructor(name1: string, min1: number, max1: number, value1: number)
    {
        super(name1);
        this.min1= min1;
        this.max1= max1;
        this.value1 = value1;
    }

    //Mutator 
    public setValue(value1:number)
    {
        if(value1 < this.min1)
        {
            console.log("Value is less than minimum");
            return;
        }
        if (value1 > this.max1)
        {
            console.log("Value is more than maximum");
            return;
        }
        this.value1 = value1;
    }

    //Accessor 
    public getValue()
    {
        return this.value1;
    }
}

class FixedPriceParameter extends Parameter
{
    //Data members (Fixed Price)
    private min2 =0;
    private max2 =100;
    private value2=1.00;

    //Constructors
    constructor(name2: string, min2: number, max2: number, value2: number)
    {
        super(name2);
        this.min2= min2;
        this.max2= max2;
        this.value2 = value2;
    }

    //Mutator 
    public setValue(value2:number)
    {
        if(value2 < this.min2)
        {
            console.log("Value is less than minimum");
            return;
        }
        if (value2 > this.max2)
        {
            console.log("Value is more than maximum");
            return;
        }
        this.value2 = value2;
    }

    //Accessor 
    public getValue()
    {
        return this.value2;
    }
}

class NumOfServicesParameter extends Parameter
{
    //Data members (Number Of Services)
    private min =0;
    private max =100;
    private value=1;

    //Constructors
    constructor(name: string, min: number, max: number, value: number)
    {
        super(name);
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

class ServiceCostParameter extends Parameter
{
    //Data members (Service Cost)
    private min1 =0;
    private max1 =100;
    private value1=1.00;

    //Constructors
    constructor(name1: string, min1: number, max1: number, value1: number)
    {
        super(name1);
        this.min1= min1;
        this.max1= max1;
        this.value1 = value1;
    }

    //Mutator 
    public setValue(value1:number)
    {
        if(value1 < this.min1)
        {
            console.log("Value is less than minimum");
            return;
        }
        if (value1 > this.max1)
        {
            console.log("Value is more than maximum");
            return;
        }
        this.value1 = value1;
    }

    //Accessor 
    public getValue()
    {
        return this.value1;
    }

}

class CommissionPercentageParameter extends Parameter
{
    //Data members (Commission Percentage)
    private min2 =0;
    private max2 =100;
    private value2=1;

    //Constructors
    constructor(name2: string, min2: number, max2: number, value2: number)
    {
        super(name2);
        this.min2= min2;
        this.max2= max2;
        this.value2 = value2;
    }

    //Mutator 
    public setValue(value2:number)
    {
        if(value2 < this.min2)
        {
            console.log("Value is less than minimum");
            return;
        }
        if (value2 > this.max2)
        {
            console.log("Value is more than maximum");
            return;
        }
        this.value2 = value2;
    }

    //Accessor 
    public getValue()
    {
        return this.value2;
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

function nameOfSalaryCalculation(CalculationMethod: any,string: any) {
throw new Error("Function not implemented.");
}
