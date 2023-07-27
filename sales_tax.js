"use strict";

var calculateTax = function(subtotal, taxRate) {
    var salesTax = (subtotal * taxRate) / 100;
    salesTax = salesTax.toFixed(2);
    return salesTax;
}

var calculateTip = function(subtotal, tip) {
    var tipAmount = (subtotal * tip) / 100;
    tipAmount = tipAmount.toFixed(2);
    return tipAmount;
}

var calculateTotal = function(subtotal, salesTax, tipAmount) {
    var total = parseFloat($("#subtotal").val()) + parseFloat(salesTax) + parseFloat(tipAmount);
    total = total.toFixed(2);
    return total;
}

var processEntries = function() {
    var isValid = true;
    var subtotal = $("#subtotal").val();
    var taxRate = $("#tax_rate").val();
    var tip = $("#tip").val();
    var salesTax = calculateTax(subtotal, taxRate);
    var tipAmount = calculateTip(subtotal, tip);
    var total = calculateTotal(subtotal, salesTax, tipAmount);

    // Check for validity
    if (subtotal == "") {
        $("#subtotal").next().text("This field is required.");
        isValid = false;
    } else if (isNaN(subtotal)) {
        $("#subtotal").next().text("Must be a valid number.");
        isValid = false;
    } else if (subtotal <= 0) {
        $("#subtotal").next().text("Must be > 0.");
        isValid = false;
    } else {
        $("#subtotal").next().text("");
    }
    if (taxRate == "") {
        $("#tax_rate").next().text("This field is required.");
        isValid = false;
    } else if (isNaN(taxRate)) {
        $("#tax_rate").next().text("Must be a valid number.");
        isValid = false;
    } else if (taxRate < 0 || taxRate > 100) {
        $("#tax_rate").next().text("Must be between 0 and 100.");
        isValid = false;
    } else {
        $("#tax_rate").next().text("");
    }
    if (tip == "") {
        $("#tip").next().text("This field is required.");
        isValid = false;
    } else if (isNaN(tip)) {
        $("#tip").next().text("Must be a valid number.");
        isValid = false;
    } else if (tip < 0) {
        $("#tip").next().text("Must be >= 0.");
        isValid = false;
    } else {
        $("#tip").next().text("");
    }
    if (isValid == true) {
        $("#sales_tax").val(calculateTax(subtotal, taxRate));
        $("#tip_amount").val(calculateTip(subtotal, tip));
        $("#total").val(calculateTotal(subtotal, salesTax, tipAmount));
    }
};

var resetForm = function() {
    // Clear all values on form
    $("#subtotal").val("");
    $("#tax_rate").val("");
    $("#tip").val("");
    $("#subtotal").next().text("*");
    $("#tax_rate").next().text("*");
    $("#tip").next().text("*");
    $("#sales_tax").val("");
    $("#tip_amount").val("");
    $("#total").val("");
    $("#subtotal").focus();
};

$(document).ready(function() {
    $("#calculate").click(processEntries);
    $("#clear").click(resetForm);
    $("#subtotal").focus();
});
