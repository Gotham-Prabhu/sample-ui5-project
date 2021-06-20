/* global XLSX:true */
/* global moment:true */

sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment"
], function (
	Controller,
	JSONModel,
	Fragment
) {
	"use strict";

	return Controller.extend("sap.ui.excel.ui5-sheetjs-t.controller.ForecastDashboard", {

		/**
		 * @override
		 */
		onInit: function () {
			var excelData = {
				results: [{
					id: 1,
					title: "First",
					content: "First Content"
				},
				{
					id: 2,
					title: "Second",
					content: "Second Content"
				},
				{
					id: 3,
					title: "Third",
					content: "Third Content"
				},
				{
					id: 4,
					title: "Fourth",
					content: "Fourth Content"
				},
				{
					id: 5,
					title: "Fifth",
					content: "Fifth Content"
				}
				]
			}

			excelData = new JSONModel(excelData);
			this.getView().setModel(excelData,"ExcelModel");

			var oTemplateModel = new JSONModel({"BeginDate" : "2021-05-02", "EndDate" : "2022-02-12", "Periodicity" : "Daily"});
			this.getView().setModel(oTemplateModel,"ForecastTemplateModel");

		},

		downloadExcelTemplate: function(){
			var excelDataModel = this.getView().getModel("ExcelModel");
			var excelResultsArray = excelDataModel.getProperty("/results");
			var workSheet = XLSX.utils.json_to_sheet(excelResultsArray);
			//Create a new WorkBook
			var workBook = XLSX.utils.book_new();
			//Create a new Workbook and append the sheet
			XLSX.utils.book_append_sheet(workBook,workSheet,"SheetJS 1");
			var sFileName = "ForecastTemplate.xlsx";
			XLSX.writeFile(workBook,sFileName);
		},

		onCreateTemplate: function(oEvent) {
			var oCreateTemplateModelData = this.getView().getModel("ForecastTemplateModel").getData();
			var oBeginDate = moment(oCreateTemplateModelData.BeginDate);
			var oEndDate = moment(oCreateTemplateModelData.EndDate);
			var periodicity = oCreateTemplateModelData.Periodicity;
			var worksheetData = [['Supplier ANID', 'Supplier Name'], [oCreateTemplateModelData.SupplierANID, oCreateTemplateModelData.SupplierName]]
			debugger;
			if (periodicity === 'Daily'){
				while (oBeginDate.isSameOrBefore(oEndDate)) {
					worksheetData[0].push(oBeginDate.format('DD MMM YYYY'));
					oBeginDate.add(1, 'days');
				}
				console.log(worksheetData);
				

			} else if (periodicity === 'Weekly'){

			} else if (periodicity === 'Monthly'){
				
			} else if (periodicity === 'Yearly'){
				
			}

			var workSheet = XLSX.utils.aoa_to_sheet(worksheetData);
			var objectMaxLength = []
			worksheetData.map(arr => {
				Object.keys(arr).map(key => {
				  let value = arr[key] === null ? '' : arr[key]
			  
				  if (typeof value === 'number')
				  {
					return objectMaxLength[key] = 10
				  }
			  
				  objectMaxLength[key] = objectMaxLength[key] >= value.length ? objectMaxLength[key]  : value.length
				})
			  })

			  let worksheetCols = objectMaxLength.map(width => {
				return {
				  width
				}
			  })
			
			workSheet["!cols"] = worksheetCols;
			//Create a new WorkBook
			var workBook = XLSX.utils.book_new();
			//Create a new Workbook and append the sheet
			XLSX.utils.book_append_sheet(workBook,workSheet,"SheetJS 1");
			var sFileName = "ForecastTemplate.xlsx";
			XLSX.writeFile(workBook,sFileName);

		}

	});
});