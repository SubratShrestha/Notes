# Futures, Forwards and Options.

# Derivatives

called derivatives because derive their price from underlying physical market product (derive their price not only from the futures/derivatives market, but also the underlying physical markets). They enable the investors and borrowers to protect their assets and liabilities against the risk of changes interest rates, exchange rates and share prices. 

They are **hedging tools** to help manage risk by providing some certainty on risk exposures.

types of derivative contracts:

* commodity (ex. gold, wheat and cattle)

* financial (ex. indices, shares, government securities, and money market instruments)


# Futures

Futures contract is an agreement to buy or sell a specific item at a specified future date at a price determined today.

Buy Futures / Long Position = Agreement to buy an asset in the future.

Sell Futures / Short Position = Agreement to sell an asset in the future.



### Decision Rule:

* What you want to do with the asset in the future, do it in the futures market now, OR
* Whatever position you have in the asset, take the opposite position in the futures market.



**ex.** Farmer's 10 tonne wheat crop will be harvested and ready for sale in 3 months time. What is the risk that he needs to protect against? Would he need short or long future?

The risk would be in the price of wheat in 3 months time, if it is expected to fall, it will, and that can result in a huge loss for the farmer. The farmer needs to hedge his risk using futures.

since he wants to sell wheat in the future, he sells futures / takes short position today.  OR

since he has a long position in wheat (he bought/in expense the land, time, etc), he needs to take the opposite which is take a short position in wheat futures.

![image-20201123135234315](C:\Users\subra\Documents\Notes\UNSW\20T3\1612fins\futures, fras, and options.assets\image-20201123135234315.png)



## Properties of Futures

Futures are **highly standardised** and an order of a futures contract normally specifies:

* whether its a buy/sell order
* type of contract (varies b/w exchanges)
* delivery month (expiration)
* price restrictions (if any) (ex. limit order)
* time limits on the order (if any) 

All of these are standardised meaning they are the same for everyone.



### How do they manage risk?

* Hedging involves transferring the risk of **unanticipated changes** in prices, interest rates or exchange rates to another party.

* Futures contract is an agreement to buy or sell a specific item at a specified future date at a price determined today. You don't know what will happen to the prices in the future, so with a futures contract, you've bought that certainty because you know what price you'll get in the future. 

* change in the market price of a commodity or security is offset by a profit or loss on the futures contract (bringing certainty).

	

### Margins

Futures have something called margin requirements, where if the price of the futures or the spot price (price of the asset acc. to market) fluctuates, the future contract (with margins) will still trade at the value agreed on (net).

ex. the future contract was for some future delivery date of some asset at \$200, initially both the buyer and the seller of the asset will put in some small percentage or exact dollar value (will be the future contract) called the initial margin, which is held by the exchange.

Remember that at the end of the future contract, both parties will buy/sell the asset for the market price of the asset, BUT this price will be offset by the margins which works like this:

If the spot price of the asset increases, if nothing happened the seller would be quite happy because he can sell at a greater price, but the buyer would have been bamboozled. So to keep things fair, the exchange mandates that the seller transfer the difference in price to the margin of the buyer.

If the price decreased, then it would be great for the buyer, but unfair to the seller, so to keep things fair, the buyer has to transfer the difference in price to the seller's margin.

In the end when the buyer and seller buy/sell at the spot price, they would've paid/received the difference of price b/w the spot price now and the agreed amount.

Ex. agreed price = \$200 

| seller's margin | spot price | buyer's margin |
| --------------- | ---------- | -------------- |
| 10              | 200        | 10             |
| +50 => 60       | 150        | -50 => -40     |
| +50 => 110      | 100        | -50 => -90     |

Now at delivery date, the seller will sell and buyer will buy at \$100, but the seller has gotten 100 (+50 + +50), and the buyer had to pay 100 (-50 + -50), so in net amounts, the seller got 200 (100 from selling + 100 from margin), and the buyer bought for 200 (100 for buying asset, and 100 in margin)



### Participants in Futures markets

Four main participants:

* Hedgers
* Speculators
* Traders
* Arbitragers

These participants provide depth and liquidity to the futures market, improving its efficiency.



### What do futures help hedge risks of?

Futures contracts may be used to manage identified financial risk exposures such as:

* Hedging the cost of funds (borrowing hedge)
* Hedging the yield on funds (investment hedge)
* Hedging a foreign currency transaction
* Hedging the value of a share portfolio



Ex. Business plans to borrow approx. \$20m in short-term funding through the issue of commercial paper in three months' time. The business does not have a view on what is likely to happen to interest rates over the next three months. But it would be very satisfied if it could obtain its funding at the current yield.

Today's data:

* current commercial paper yields 8.00% p.a
* 90-day bank accepted bills futures contract 91.75 (100 - yield)
* data in 3 months: unknown.

Since the futures are trading at 91.75 which is 100 - yield, the future yields of the commercial paper is trading at 8.25, this means that the market consensus is that the commercial paper yields will go up.

If the commercial paper yields increase, then the business would rather sell futures now (because rn, the yield is lower, so the price of the future (100 - yield) is higher), and buy later, when the yield of commercial paper goes up and futures price get lower.

![image-20201124141537393](C:\Users\subra\Documents\Notes\UNSW\20T3\1612fins\futures, fras, and options.assets\image-20201124141537393.png)

Say in 3 months time, if the commercial paper now yields 9% p.a. and the 90-day bank-accepted bills futures contract 91.25

![image-20201124142124001](C:\Users\subra\Documents\Notes\UNSW\20T3\1612fins\futures, fras, and options.assets\image-20201124142124001.png)

![image-20201124142201832](C:\Users\subra\Documents\Notes\UNSW\20T3\1612fins\futures, fras, and options.assets\image-20201124142201832.png)

so the loss (47,311.18) is offset by hedging (23,655.56) because of futures.

There is no perfect hedge (offset equal to loss amount so that net loss is zero) because of initial and basis risk.

Ex. for exercise.

![image-20201124142311891](C:\Users\subra\Documents\Notes\UNSW\20T3\1612fins\futures, fras, and options.assets\image-20201124142311891.png)



## Risks in using futures for hedging

The risks include:

* standard contract size
* margin risk
* basis risk
* cross-commodity hedging.



### Standard contract size

Since futures are highly standardised, the contract size may not exactly match what the buyer/seller is looking for. Say sompany wants to get \$1.5m, but the contract size is \$1m per contract, so if they sell just 1, they get under, if they sell 2, they get over.

This makes a perfect hedge impossible in some cases.



### Margin risk

* Initial margin is required when entering into a futures contract.
* further cash is required if prices move adversely (margin calls).
* opportunity costs associated with margin requirements.



### Basis risk

* Initial basis is the difference between the price in the physical market and the futures market at start of a hedging strategy. Ex. from prev. when the current commercial paper yield was 8% and the futures contract was 8.25%, so the initial basis was 0.25%.
* Final basis is the difference between the price in the physical market and the futures market at completion of a hedging strategy.
* a perfect hedge requires 0 initial and financial risk.



### Cross-commodity hedging

* Use of a commodity or fin. instrument to hedge a risk associated with another commodity or instrument, ex. like 90-day commercial paper when maybe 75-day loan is needed.
* selection of a futures contract that has price movements that are highly correlated with the price of the commodity or instrument to be hedged, ex. maybe you sell wheat and you get rice futures to buy/sell in exchange to make a hedge.



# Forward Rate Agreement (FRA)

FRAs are over-the-counter (not traded in the exchange, instead its an agreement b/w 2 parties) product enabling management of interest rate risk exposure.

The agree date is when the rate is agreed on, the settlement date is when the rate is applied, and the end date is when the FRA is finished (the contract period is over).

* Agreement b/w parties on some interest rate that will apply at a specified date (NOT standardised, custom to the agreement)
* Allows lender and borrower to lock in interest rates
* no exchange of principal, unlike a loan
* payment b/w the parties involves the difference b/w agreed interest rate and the actual interest rate at settlement



An FRA includes:

* FRA agree date, fixed at start of agreement
* notional principal amount of the interest cover (no actual principal)
* FRA settlement date when compensation is paid
* contract period on which FRA interest rate cover is based (end date)
* reference rate to be applied at settlement



### Disadvantages

* risk of non-settlement (credit risk - counterparty risk)
* no formal market



## Formula/e

$$
Settlement\ Compensation\ Amount = FRA\ settlement\ rate - agreed\ rate\\
=\frac{365\times P_{notional}}{365 + (days\times i_{settle})}-\frac{365\times P_{notional}}{365 + (days\times i_{agree})}
$$

* use the number of days in some months if specific dates not provided (180 for 6 months)



## Pros and Cons

### Advantages

* Custom made agreements providing great flexibility with respect to contract period and the amount of each contract.
* unlike futures contract, an FRA doesn't have any margin payments, no exchange involved.



### Disadvantages

* Risk of non-settlement (credit risk - counterparty risk)
* no formal market exists and concern about difficulty closing out FRA position is overcome by entering into another FRA opposite to the original agreement.



## Example

On 19 Sept. this year a company wishes to lock in the interest rate on a prospective borrowing of \$5 000 000 for a 6 month period from 19 Apr. next year to 19 Oct. of the same year. An FRA dealer quotes '7Mv13M(19) 13.25 to 20'. On 19 Apr. the BBSW on 180-day money is 13.95% p.a.

Here:

* at t=0 (Sept) company wants to borrow
* at t=7 (apr) is the settlement date
* at t=9 (oct) is the end date
* since the dealer will always seek a profit, the company get quoted the higher rate (13.25), and this is the agreed rate
* Fra starts in 7 months, the quote related to 6 month money (ie. 7 + 6 = 13 months), 19 is the settlement date dealer is willing to lend at 13.25 and borrow at 13.20 (5 bps spread).

$$
Settlement=\frac{365\times 5000000}{365+(183\times 0.1395)}-\frac{365\times 5000000}{365+(183\times 0.1325)}\\
=-\$15379.19.
$$

As the interest rates have risen over the period, the settlement of \$15,379.19 is paid by the FRA dealer to the company.