#  Chapter 10: Long term debt

Financing arrangement for a period of more than 1y with different borrower needs like timing of repayment, risk, interest rate structures (variable or fixed), and source of funds.

Specifically for long term debt, the borrower should consider:

* fixed or variable interest rate
* Term of the financing arrangement
* Repayment schedule
* Loan covenants
* Whether secured by fixed or floating charge, or unsecured 
* Leasing an asset vs buying the asset 

# Securities

## Debentures and Unsecured notes

Securities => tradable.

They are corporate **bonds** issued in the corporate bond market, they specify that the lender will receive regular interest payments (called coupons) during the term of the bond and receive repayment of the FV at maturity.

**Debentures** are **secured** bonds, they are secured by either a fixed or floating charge over the issuer's unpledged assets. They are listed and traded on the stock exchange, and they also have a higher claim over a company's assets (ex. on liquidation of the firm) than **unsecured** note holders.  

Three ways they can be issued:

* Public issue: issued to the public at large
* Family issue: issed to existing shareholders and investors
* Private placement: issued to institutional investors.

Usually issued at face value, but may be issued at a discount or with deferred or zero interest.





## Subordinated debt

More like equity than debt so its called quasi-equity with features of debt and equity (hybrid instruments).

Claims of debt holders are 'subordinated' to all other company liabilities.

Agreement might specify that the debt not be presented for redemption until after a certain period has elapsed.

May be regarded as equity in the balance sheet though. So if you have a negative covenant saying your debt to equity ratio must be at some point, you can get subordinated debt and it won't be counted as debt but as equity.



# Non-Securities

## Term loans and Fully drawn advances

Loan advanced for specific period (3-15 yrs) for a known purpose like buying land, premises, plant and equipment.

Secured by mortgage over asset purchased or other assets of the firm.

**Fully drawn advance** is a term loan where the full amount is provided at the start of the loan period.

Usually term loans are provided by commercial banks and finance companies, and to a lesser degree, investment banks, merchant banks, insurance offices and credit unions.



### Structure of term loans

**Usual structure**: Interest only during term of loan and principal repayment on maturity.

**Amortised or credit foncier loan**:

* Periodic loan instalments consisting of interest due and reduction of principal.



**Deferred repayment loan:**

* Loan instalments commence after specified period related to project cash flows and the debt is amortised over remaining term of loan.



**The interest rate** charged on term loans are based on:

* an indicator rate (ex. BBSW or bank's own prime lending rate)
* credit risk of borrower
* term of loan
* repayment schedule

Other fees can include: establishment fee, service fee, commitment fee, line fee.



### Loan Covenants

They are extra terms and conditions on the borrower and they restrict the business and financial activities of the borrowing firm. This is done so that the borrowers **remain** creditworthy. Since we're talking about loans of 3 - 15 years, the borrower can become less creditworthy in that time, so lenders set up loan covenants to make sure the borrowers are still creditworthy.

In that 3 - 15 years, the borrower could have taken more loans from other lenders and this reduces their creditworthiness, or they could have made horrible investment choices, etc.

* Positive loan covenants (something lender has to do): requires the borrower to take prescribed actions like provision of financial reporting to the lender.
* Negative loan covenants (things lender cannot do): restricts the activities of borrower ex. borrower must maintain max. Debt to Equity ratio, or borrower must maintain min. working capital ratio.

Breach of these loan covenants result in default on the loan, and this entitles the lender to the borrower's assets, or whatever was discussed in the loan contract.



Ex. The CFO of a corporation has arranged term loan for company with conditions: loan will have variable interest of BBSW plus 95 basis points. The loan interest will be reset every 6 months for duration of the loan.

The interest is not fixed, and is reset every 6 months, so the lender is checking up on the borrower every 6 months and can decide on a new interest rate, that interest rate will depend on the market rate (BBSW) and the creditworthiness of the borrower, that 95 can go up or down depending on the financial condition of the borrowing company. 





## Mortgage Finance

form of security for a loan. The borrower (mortgagor) says he wants to buy the land and property to the lender (mortgagee).

If the mortgagor defaults, the mortgagee is entitled to foreclose on the property i.e take possession of assets and realise any amount owing to the loan.

Mainly used to finance retain home loans up to 30 year terms and to a lesser degree, commercial property loans up to 10 years as businesses generate cash flows enabling the repayment.

The providers are commercial banks, building societies, finance companies, and mortgage originators.



## Leasing





# Calculations

So for short term discount securities, t is always 1 because there's only 1 cash flow, which is just once at maturity. But for long term, there can be many cash flows like dividends, but for bonds its coupons. Of course bonds can also be zero-coupon bonds which means its the same as discount securities with 1 cash flow at maturity.

Also for short term debt or discount securites, the P < FV. But in long term debt, the debt can be sold in:

* Premium: P > FV (coupon rate (what borrower sets) > yield (what market sets))
	* since the the borrowing company is offering a coupon rate that's higher than the yield, this is very attractive to lenders, so the Price > FV.
* Par: P = FV (coupon rate = yield)
* Discount: P < FV (coupon rate < yield).



* Price:
	$$
	P = PV_{coupons} + PV_{face\ value}\\
	\\\ \\\ \\
	PV_{coupons}\ =\ C(\frac{1-(1+i)^{-n}}{i})
	\\
	where\ C=coupon\ payment(semi\ annual),\\ i=interest.\\
	\ \\
	PV_{face\ value} = A(1+i)^{-n}\\
	where\ A=principal,\ i=interest, n=no.of\ cashflows\\
	$$

* When the bond is **sold between coupon dates**, the Price will be:

* $$
	P=P\times (1+i)^k\\
	k=\frac{no.of\ days\ since\ last\ coupon\ payment}{no.of\ days\ between\ coupons\ payments\ (181)}.
	$$

	* here, we calculate P as normal from above formula, but we multiply it by a factor.

* 

* ex. AA+ corporate bond yields in the market at 8% per annum. What is price of an existing AA+ corporate bond with FV of 100000, paying 10% per annum half-yearly coupons, and exactly 6 years to maturity.

* $$
	FV=\$100000\\
	C=100000\times \frac{0.10}{2}=\$5000\\
	i=\frac{0.08}{2}=0.04\\
	t=6\times2=12\\\ \\\ 
	PV_{coupons} = 5000(\frac{1-(1+0.04)^{-12}}{0.04})=46925.37\\
	PV_{face\ value}=100000(1+0.04)^{-12}=62459.70\\
	Price = 46925.37\ +\ 62459.70=\$109,385.07
	$$

* ex. Woodside ltd issued 100 mil. of corporate bond, with fixed interest coupon equalt o current interest rates of 7.70% per annum, coupons paid half yearly and a maturity of 10 years.

* When the Coupon rate and interest rate is the same, the price will just be the FV.
	$$
	P = 100mil
	$$

* ex. Corporate bond yields in market at 8% per annum. An existing corporate bond with FV 100000 paying 10% per annum half yearly coupons matures 31 December, 2017 would be sold on 20 May 2011 at what price?

* last coupon payment must have been on 31st of December 2010

* $$
	FV=100000\\
	i=\frac{0.08}{2}=0.04\\
	C=100000\times\frac{0.1}{2}=5000\\
	n=2017-2011=6\times2=12\\
	PV_{coupons}= 5000(\frac{1-(1+0.04)^{-12}}{0.04})=46925\\
	PV_{face\ value}=100000(1+0.04)^{-12}=62459.70\\
	P=46925.37+62459.70=109385.07\\
	P_{20\ may\ 2011} = 109385.07\times(1 + 0.04)^{\frac{140}{181}}=\$112,754.27
	$$

* 