# conference-planner

## Introduction
The inspiration for creating this project came from a tweet by @balajis.
![tweet](https://github.com/ThePrincipleMan/conference-planner/blob/main/image.png)

Organising an international conference is a difficult task in itself without even keeping in mind various travel restrictions that exits for different passport holders.
The aim of this project is to relieve this burden from the organizers and to recommend the best suited destinations to host their conference based on the list of participants they input.

## Website

Website - https://conferenceplanner-theprincipleman.netlify.app/planner
*It may take a few moments for the backend to activate and respond to your request once you press the submit button*
The website is hosted in 2 parts, with its backend(api) hosted on render.com and frontend(client) on vercel.com

## Overview
The application is divided into two parts, namely client and api. A api request is made from the client with data to the backend, and the response is displayed to the user.

The application prompts the user to input participant details. The details requested are Name, Nationality and Current Country of Residence.
Each piece of information is used to generate the optimal output to users request.

Once the necessary data is collected and a call is made to the backend, the backend receives this data and starts processing it.

Step 1 - 
Participants are sorted based on the *rank* of their passport in ascending order. This rank is directly proportional to strength of the passport (i.e. rank of afghanistan < rank of USA). Thus we start processing from the participant who has the weakest passport. This helps in eliminating various countries early on from consideration and saves processing power.

Step 2 - 
Participants are iterated over one by one and two sets of strings are maintained which are *visafree access* and *with visa access*.
At participant[i], *visafree access* countries are the set of all countries that allow visa free travel to citizens of countries to whome participant[0], participant[1], ..., participant[i] belong to. These sets are updated at each iteration.

Step 3 - 
Once we iterate over all participants we get two sets of countries which are possible hosting destinations for us. These countries will allow access to our participants (either visa free of with visa, depending on the set). Now we sort countries based on their cumulative distance from participants in ascending order. The lower the cumulative distance, the lower more central will the location be.

Step 4 - 
The response is generated in this step based on the countries we shortlist. This response, once prepared is sent to the frontend to be displayed to the user.

With this, we shortlist the countries based on visa requirements (ensuring ease), centrality (distance to all participants) and cost.
Distance is also used as a proxy for cost as is explained in *future scope*

## Future Scope
The application can be further augmented by implementing a minimum cumulative cost(ticket price) filter to the existing process. At this point in time, SkyScanner API is the only viable api which could be found for the purpose. But this api was difficult to use along with having a cap of 100 requests per minute, thus becoming a potential bottleneck in the future. If and when a dataset of ticket prices between major destinations become available, distance can serve as a good proxy.
Furthermore an additional filter for *infrastructure* can also be added before returning response keeping in mind the capacity of the host nation to accomodate the participants for the conference. For e.g. St. Vincent and the Grenadines may have lax visa norms but they may not have the capacity to cater to potentially 100s or even 1000s of guests, for which more infrastructurally developed nations should be preferred.
A country specific primer and trivia section can go a long way in helping a user decide on a host nation from our recommendations without having to leave the site to glean additional information about each recommended country.

## Tech Stack 

**Frontend**
*ReactJS
*JavaScript
*React libraries (React-Router-Dom and more)
*HTML+CSS

**Backend**
*NodeJS
*Nodemon

**Data Preprocessing**
*Python
*Numpy
*Pandas
Used above to preprocess the data into usable form for passport eligiblity and distances datasets.

## Links
Passport (visa eligiblity dataset) - [![passport]](https://github.com/ilyankou/passport-index-dataset)
Distances (Between most populus cities of countries) - https://github.com/rahulbot/distances-between-countries

