function showRegisteredCompanyInfo(e)
{
	e = e || window.event;
    var charCode = (typeof e.which == "number") ? e.which : e.keyCode;

    if (e.value.length == 10)
    {
        $("#company-info").show();
    }
}

function hideAll()
{
	if ($("#body-bank-product").is(':visible'))
	{
		$("#body-bank-product").slideUp();
	}
	if ($("#body-purpose").hide().is(':visible'))
	{
		$("#body-purpose").slideUp();
	}
	if ($("#body-business-intro").is(':visible'))
	{
		$("#body-business-intro").slideUp();
	}
	if ($("#body-business-details").is(':visible'))
	{
		$("#body-business-details").slideUp();
	}
	if ($("#body-personal-info").is(':visible'))
	{
		$("#body-personal-info").slideUp();
	}
}

function showBankProduct()
{
	hideAll();

	$("#body-bank-product").slideDown();
	return false;
}

function showPurpose()
{
	hideAll();

	$("#body-purpose").slideDown();
	return false;
}

function showBusinessIntro()
{
	hideAll();

	$("#body-business-intro").slideDown();
	return false;
}

function showBusinessDetails()
{
	hideAll();

	$("#body-business-details").slideDown();
	return false;
}

function showPersonalInfo()
{
	hideAll();

	$("#body-personal-info").slideDown();
	return false;
}

function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
}

function saveCredentials()
{
	post("fundingme.cloudapp.net/sme/register", {email: 'mailuan@gmail.com', password: 'pass1234', reg_no: '1234123434A', phoneNumber: '12341234'});
}