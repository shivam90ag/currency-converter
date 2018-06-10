import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';
import { UtilityService } from '../shared/services/utility.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AppService } from '../app.service';
//this is useing inside a callback to access the component variable
var that: any;


@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard-component.css'],
    providers: [DashboardService,AppService]
})
export class DashboardComponent implements OnInit {
    itemDetailsForm: FormGroup;
    submitted: boolean = false;
    queries:Array<any>=[];
    currencyList:Array<any>=[];
    selectedItem:any="";
    pageArray: Array<any>;
	selectedPage: number;
    pageSize: number = 5;
    isLoading:boolean;
    currencyLoading:boolean;
    pageSizeOption: Array<any> = [5,10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    selectedIndexCurrencyFrom:number=0;
    selectedIndexCurrencyTo:number=0;
    selcetedValue:number;
    convertedValue:number;
    selectedQuery:any;
    constructor(
        private router: Router,
        private dashboardService: DashboardService,
        private appService:AppService,
        private utilityService: UtilityService,
        private formBuilder: FormBuilder,
        private toastr: ToastsManager,vcr: ViewContainerRef) { 
            that = this;
            that.toastr.setRootViewContainerRef(vcr);
            if(this.pageSizeOption.indexOf(this.pageSize)<0) {
				this.pageSizeOption.push(this.pageSize);
            }
        }

    ngOnInit() {
        
        this.pageArray = [{ pageNo: 1 }];
        this.selectedPage=1;
        this.getHistory();
        this.createForm();
        this.latestCurrency();
        this.appService.createConnection();
        
    }
    createForm() {
        this.itemDetailsForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            quantity: ['', [Validators.required]]
        });
    }
    goToPage(next: boolean) {
		if (!next) {
			// Remove current page and next page data on call previous page record
            this.selectedPage=this.selectedPage-1;
		}else{
            this.selectedPage=this.selectedPage+1;
        }
		this.getHistory();
	}

	pageSizeChange(size: any) {
        this.pageSize = parseInt(size);
        this.getHistory();
    }
    addQuery(from,to,value,convertedvalue){
        let reqData ={from:from, to:to, value:value, convertedvalue:convertedvalue};
        this.dashboardService.addQuery(reqData,(data)=>{
            this.queries.splice(this.queries.length-1,1)
            this.queries.unshift(data);
            this.utilityService.showSuccessToastr(this.toastr, 'Success!', "History updated");
        },(err)=>{
            this.utilityService.showErrorToastr(this.toastr, 'Error!', "Internal Server Error");
        })
    }
    convert(){
        this.convertedValue =this.selcetedValue*(1/this.currencyList[this.selectedIndexCurrencyFrom].value)*this.currencyList[this.selectedIndexCurrencyTo].value;
        this.addQuery(this.currencyList[this.selectedIndexCurrencyFrom].name,this.currencyList[this.selectedIndexCurrencyTo].name,this.selcetedValue,this.convertedValue)
    }

    openHistoryModal(query){       
        this.selectedQuery = query; 
        this.utilityService.showModal('#deleteModal'); 
    }

    deleteHistory(){
        let reqData=[this.selectedQuery._id];
        this.dashboardService.deleteHistory(reqData,(data: any) => {
            this.hideDeleteModal();
            this.getHistory();
            this.utilityService.showSuccessToastr(this.toastr, 'Success!', " Deleted");
        },(err) => {
            this.utilityService.showErrorToastr(this.toastr, 'Error!', "Internal Server Error");
        })
    }

    hideDeleteModal(){
        this.selectedQuery={};
        this.utilityService.hideModal('#deleteModal');
    }
    getHistory(){
        this.isLoading=true;
        this.selectedPage = this.selectedPage>0?this.selectedPage :1;
        let reqData ={pageNo:this.selectedPage,pageSize:this.pageSize}
        this.dashboardService.getHistory(reqData,(data: Array<any>) => {
                this.queries = data;
                this.isLoading=false;
            },(err) => {
                this.isLoading=false;
                console.log(err);
            })
    }

    latestCurrency(){
        this.currencyLoading=true;
        let reqData={value:70,from:'INR', to:'USD'};
        this.dashboardService.latestCurrency(reqData, (data)=>{
            this.currencyList = this.getCurrencyArray(data.rates);
            this.currencyLoading=false;
        },(err)=>{
            this.currencyLoading=false;
        })
    }
    getCurrencyArray(data:any){
        let currencyList=[]
        for(let currency in data){
            currencyList.push({name:currency,value:data[currency]});
        }
        return currencyList;
    }

    logout() {
        this.dashboardService.logout().then((data) => {
          console.log('logged out successfully');
          this.appService.closeConnection();
          this.router.navigate(['/login']);
        }).catch((err) => {
          console.log('logout failed');
          console.log(err);
        })
      }
}
