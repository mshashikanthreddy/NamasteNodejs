
- In routing the if "/" infront it ignores all routes after it, because it matches
    checks in synchoronous order if "/" is there it ignores after-ward like "/hello"

    case 1:- if /hello and /hello/test is there in synchoronous order if we hit "localhost:3000/hello/test"
        it hits the /hello route not /hello/test as it checks only /hello and ignores /test

    case 2:- But for /hellotest and /hello/test if we hit "localhost:3000/hello" it ignores both as one is 
    "string" mismatch and other is the /hello(url) haven't matched to /hello/test.
                viceversa is true /hello/test(url) matches to /hello.

    for real example: if we try www.companyname.com/careers/123 it redirects to career portal
    if we try www.companyname.com/about/  it may show error as it may have about/company.

- Use effectively app.get, app.post,... rather than same method app.use as it triggers all operations.

some routing examples if ab?c => 'b' becomes optional if we use 'ac', 'abc' it works for both.
    - ab+c => it works any number of 'b's after one 'b' like abc , abbbc, ab...bc
    - ab*cd => start with 'ab' and end with cd inbetween we can write anything like 'ab234cd'
    - a(bc)? => here 'bc' becomes optional , similarly for *,+
    - /a/ => anywhere 'a' exists it works
    - /.*abc$/ => anything in starting and ends with abc.

- user?userId=101  => it can be obtained using req.query
- user/:userId     => it can be obtained using req.params (Dynamic routes) which should be write on top before normal routes.

- next is a middleware which makes the req to travel from one middleware(path) to another until a response is 
send to the server.

- If we try to send another response after sending a response using a middleware(next) it throws an 
Error - "cannot set the headers after snding the response".

- app.use() => used for auth,body parsing,logging,serving static files.
              it has only one callback function
              it is prefix based matching which matches /api,/api/abc for /api
              used in all http methods and placed in mainmiddleware stack before route handler.

- app.all() => used for crud operations for all HTTP methods.
                it has multiple call back functions
                it is exact matching which matches /api in /api,/api/abc for /api
                placed in application router stack.

- app.use('/',(err,req,res,next) => {}) here, order matters alot in req handler

- app should listen to requests on port only after successful connection of cluster or database, 
beacuse the data should be loaded even before the application starts.

- create an MongoDB Account , create a M0 free cluster ,create an user,Get the connection String

Install MongoDB compass
For mongoDB connection Here give "Access from Everywhere" in Network tab then only it will work.
    - create a database(documents)
    - create a collection
        -In there we have fields.

The express.json() is json parser gives by express, which we use for every incoming request.

As default we get the 'JSON' data we have to parse and make into a js object.

findOne() returns only one document , if multiple documents exists it returns arbitary(random)
document mostly old one.

PATCH only updates which is there in schema and nelect other parameters.
