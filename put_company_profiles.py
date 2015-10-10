import pymongo
from pymongo import MongoClient

if __name__ == "__main__":
	client = MongoClient()
	db = client.FundingME
	sme_collection = db.sme

	sme_1 = {
		'reg_no': '20123361U',
		'name': 'Homusk Pte Ltd',
		'year_of_incorporation': 2012,
		'years_of_establishment': 3,
		'country_of_incorporation': 'Singapore',
		'number_of_employees_and_workers': 30,
		'registered_office_address': '#19-24\nKing Cross Road\nSingapore',
		'industry': 'Technology Startup',
		'business_nature': 'Service',
		'brief_business_description': 'Technology company utilising the best of data science and behavioral medicine to help patients with chronic diseases',
		'annual_sales_turnover_range_in_sgd': '>1M - < 5M',
		'paid_up_capital_in_sgd': 10000,
		'bank_product_types_of_interest': ['Business Loans', 'Overdraft', 'Property Loans'],
		'list_security_that_can_be_provided': [
			{
				'type': 'property',
				'address': '#20-24 Citysquare, Master Road, Singapore'
			}, {
				'type': 'Fixed Deposit',
				'amount': 'SGD 100K'
			}
		],
		'purpose_for_loans': 'For daily operations and office expansion',
		'financials': [
			{
				'year': 2013,
				'are_financials_audited': 'Yes',
				'qualified_status': 'Unqualified',
				'name_auditor': 'E&Y',
				'annual_sales_turnover': 4350,
				'gross_profit': 435,
				'net_profit_before_tax': 131,
				'cash_balance': 1000,
				'total_assets': 3850,
				'liabilities': 500,
				'net_worth': 3350,
				'ratios': {
					'gross_margin': 10.0,
					'net_profit_margin_before_tax': 3.0,
					'current_ratio': 1.23,
					'debt_to_equity': 0.15
				}
			}, {
				'year': 2014,
				'are_financials_audited': 'Yes',
				'qualified_status': 'Unqualified',
				'name_auditor': 'E&Y',
				'annual_sales_turnover': 6000,
				'gross_profit': 1500,
				'net_profit_before_tax': 480,
				'cash_balance': 2000,
				'total_assets': 6000,
				'liabilities': 800,
				'net_worth': 5200,
				'ratios': {
					'gross_margin': 25,
					'net_profit_margin_before_tax': 8,
					'current_ratio': 1.46,
					' debt_to_equity': 0.15
				},
				'year_on_year_growth': {
					'annual_sales_turnover': 37.9,
					'gross_profit': 244.8,
					'net_profit_before_tax': 267.8,
					'cash_balance': 100
				}
			},
		],
		'trade_cycle': {
			'payment_terms': 'N/A',
			'sales_terms': 'N/A',
			'percentage_of_sales_for_top_five_customers': 'N/A',
			'percentage_of_purchase_from_top_five_suppliers': 'N/A'
		},
		'founders': [
				{
					'name': 'Shubham Goyal',
					'functionality': 'CEO',
					'age': 21,
					'nationality': 'Indian',
					'annual_income': 79600,
					'cash_balance': 10000000,
					'does_own_properties_without_mortgage': 'Yes'
				}
		],
		'rating': 'A'
	}
	sme_2 = {
		'reg_no': '199733405Y',
		'name': 'KJM Pte Ltd',
		'year_of_incorporation': 1997,
		'years_of_establishment': 18,
		'country_of_incorporation': 'Singapore',
		'number_of_employees_and_workers': 2000,
		'registered_office_address': '#19-25\nKing Cross Road\nSingapore',
		'industry': 'Garment',
		'business_nature': 'Manufacturing',
		'brief_business_description': 'Garment Manufacturing with plant located in Shenzhen, with over 1800 workers; Manufacturing clothes, hats, export to UK, US',
		'annual_sales_turnover_range_in_sgd': '>20M - < 50M',
		'paid_up_capital_in_sgd': 10000000,
		'rating': 'B'
	}
	sme_3 = {
		'reg_no': '200001234A',
		'name': ' Allion Pte Ltd',
		'year_of_incorporation': 2000,
		'years_of_establishment': 15,
		'country_of_incorporation': 'Singapore',
		'number_of_employees_and_workers': 1500,
		'registered_office_address': '#02-03 Vicotria Street, Singapore',
		'industry': 'Garment',
		'business_nature': 'Manufacturing',
		'brief_business_description': 'Established in 2000, Garment Manufacturing with plant located in Bangladesh, with over 1800 workers; Manufacturing clothes, hats, export to UK, US',
		'annual_sales_turnover_range_in_sgd': '>20M - < 50M',
		'paid_up_capital_in_sgd': 10000000,
		'rating': 'B'
	}
	sme_4 = {
		'reg_no': '200333405L',
		'name': 'ABC PTE LTD',
		'year_of_incorporation': 2003,
		'years_of_establishment': 12,
		'country_of_incorporation': 'Singapore',
		'number_of_employees_and_workers': 1000,
		'registered_office_address': '#11-07 Stupid King Building Singapore',
		'industry': 'Garment',
		'business_nature': 'Manufacturing',
		'brief_business_description': 'Established in 2003, OEM Garment Manufacturing with plant located in Tianjin, with over 1000 workers; Manufacturing clothes, hats, export to UK, US',
		'annual_sales_turnover_range_in_sgd': '>20M - <= 50M',
		'paid_up_capital_in_sgd': 10000000,
		'rating': 'B'
	}
	sme_5 = {
		'reg_no': '201333406T',
		'name': 'Cheung Yue Pte Ltd	',
		'year_of_incorporation': 2013,
		'years_of_establishment': 12,
		'country_of_incorporation': 'Singapore',
		'number_of_employees_and_workers': 300,
		'registered_office_address': '#19-26\nKing Cross Road\nSingapore',
		'industry': 'Garment',
		'business_nature': 'Manufacturing',
		'brief_business_description': 'Established in 2013, Garment Manufacturing with plant located in Bangladesh, with over 300 workers; Manufacturing clothes, hats, export to UK, US',
		'annual_sales_turnover_range_in_sgd': '>5M - <= 20M',
		'paid_up_capital_in_sgd': 5000000,
		'rating': 'C'
	}
	sme_6 = {
		'reg_no': '199833405P',
		'name': 'Workmaster Garment Manufacturing Pte Ltd',
		'year_of_incorporation': 1998,
		'years_of_establishment': 18,
		'country_of_incorporation': 'Singapore',
		'number_of_employees_and_workers': 2000,
		'registered_office_address': '#19-27\nKing Cross Road\nSingapore',
		'industry': 'Garment',
		'business_nature': 'Manufacturing',
		'brief_business_description': '"Established in 1998, Garment Manufacturing with plant located in Bangladesh, with over 500 workers; Manufacturing clothes, hats, export to UK, US',
		'annual_sales_turnover_range_in_sgd': '>5M - <= 20M',
		'paid_up_capital_in_sgd': 5000000,
		'rating': 'C'
	}
	sme_7 = {
		'reg_no': '200733400R',
		'name': 'Walmart Company Pte Ltd',
		'year_of_incorporation': 2007,
		'years_of_establishment': 8,
		'country_of_incorporation': 'Singapore',
		'number_of_employees_and_workers': 50,
		'registered_office_address': '#19-28\nKing Cross Road\nSingapore',
		'industry': 'Garment',
		'business_nature': 'Trading',
		'brief_business_description': 'Trading company to brands in Europe',
		'annual_sales_turnover_range_in_sgd': '>5M - <= 20M',
		'paid_up_capital_in_sgd': 500000,
		'rating': 'C'
	}
	sme_8 = {
		'reg_no': '198778400J',
		'name': 'Gum Tree Trading Pte Ltd',
		'year_of_incorporation': 1987,
		'years_of_establishment': 28,
		'country_of_incorporation': 'Singapore',
		'number_of_employees_and_workers': 30,
		'registered_office_address': '#19-29\nKing Cross Road\nSingapore',
		'industry': 'Garment',
		'business_nature': 'Trading',
		'brief_business_description': 'Established trading company since 1987, mainly source from China nad export to US',
		'annual_sales_turnover_range_in_sgd': '>5M - <= 20M',
		'paid_up_capital_in_sgd': 500000,
		'rating': 'D'
	}
	sme_9 = {
		'reg_no': '20143341X',
		'name': 'Goinvest Group Pte Ltd',
		'year_of_incorporation': 2014,
		'years_of_establishment': 1,
		'country_of_incorporation': 'Singapore',
		'number_of_employees_and_workers': 10,
		'registered_office_address': '#19-30\nKing Cross Road\nSingapore',
		'industry': 'Technology Startup',
		'business_nature': 'Service',
		'brief_business_description': 'Startup company specialised in creating apps for the financial sector; we have presence in HK and SG',
		'annual_sales_turnover_range_in_sgd': '>1M - <= 5M',
		'paid_up_capital_in_sgd': 10000,
		'rating': 'D'
	}
	sme_10 = {
		'reg_no': '20093901P',
		'name': 'Tripple Pte Ltd',
		'year_of_incorporation': 2009,
		'years_of_establishment': 6,
		'country_of_incorporation': 'Singapore',
		'number_of_employees_and_workers': 10,
		'registered_office_address': '#19-31\nKing Cross Road\nSingapore',
		'industry': 'Technology Startup',
		'business_nature': 'Service',
		'brief_business_description': 'Startup company developing health monitoring apps to track behavior',
		'annual_sales_turnover_range_in_sgd': '<=1M',
		'rating': 'D'
	}
	sme_collection.insert(sme_1)
	sme_collection.insert(sme_2)
	sme_collection.insert(sme_3)
	sme_collection.insert(sme_4)
	sme_collection.insert(sme_5)
	sme_collection.insert(sme_6)
	sme_collection.insert(sme_7)
	sme_collection.insert(sme_8)
	sme_collection.insert(sme_9)
	sme_collection.insert(sme_10)