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
		}



	});
});