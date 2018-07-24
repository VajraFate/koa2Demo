const Koa = require('koa')	
const bodyParser = require('koa-bodyparser');
const static = require('koa-static')
const router = require('koa-router')()
const fs = require('fs')
const session = require('koa-session')

const app =new Koa()

const staticPath = './static'
app.use(bodyParser());
app.use(static(__dirname, './static'))
app.use(static(__dirname, './vajraFate.github.io'))

app.keys = ['vajra']
app.use(session({
    key: 'SESSIONID',
    renew: true,
    maxAge: 10000
}, app))
// app.use(async (ctx)=> {
//   let request = ctx.request
//   let url = ctx.url
//   // ctx.body = {
//   //   res: ctx.request,
//   //   url,
//   //   req_query:  request.query,
//   //   req_queryString: request.querystring,
//   //   ctxQuery: ctx.query,d
//   //   ctxQuerystring: ctx.querystring
//   // }
//   // console.log(ctx.request)
//   ctx.body = ctx.request
// })

router.get('/', (ctx, next) => {
    let html=`
          <h1>JSPang Koa2 request POST</h1>
          <form method="POST" action="/">
              <p>userName</p>
              <input name="userName" /><br/>
              <p>age</p>
              <input name="age" /><br/>
              <p>website</p>
              <input name="webSite" /><br/>
              <button type="submit">submit</button>
          </form>
      `;
      ctx.session.vajra = 'vajra223'
      ctx.body = html
})

router.post('/', (ctx, next) => {
    let postData = ctx.request.body
    ctx.body = postData
    console.log(ctx.session.vajra)
})

router.get('/bird', async(ctx, next) => {
    console.log(__dirname + '/vajraFate.github.io/index.html')
    ctx.response.type = 'html'
    ctx.body = await new Promise((resovle, reject) => {
        fs.readFile(__dirname + '/vajraFate.github.io/index.html', 'utf8', function(err, file) {
            // console.log(file)
            resovle(file)
        })
    })
   
})

router.get('/404', (ctx, next) => {
    ctx.body = '<h1>404!</h1>'
})
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(9991, () => {
    console.log(__dirname + '/vajraFate.github.io/index.html')
  console.log('koa2 已经开启')
});

