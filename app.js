const Koa = require('koa')	
const bodyParser = require('koa-bodyparser');
const static = require('koa-static')
const router = require('koa-router')()

const app =new Koa()

const staticPath = './static'
app.use(bodyParser());
app.use(static(__dirname, './static'))
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
      ctx.body = html
})

router.post('/', (ctx, next) => {
    let postData = ctx.request.body
    ctx.body = postData
})
router.get('/404', (ctx, next) => {
    ctx.body = '<h1>404!</h1>'
})

app.use(router.routes())
app.use(router.allowMethods())

// app.use(async(ctx)=>{
//   if(ctx.url==='/' && ctx.method==='GET'){
//       //显示表单页面
//       let html=`
//           <h1>JSPang Koa2 request POST</h1>
//           <form method="POST" action="/">
//               <p>userName</p>
//               <input name="userName" /><br/>
//               <p>age</p>
//               <input name="age" /><br/>
//               <p>website</p>
//               <input name="webSite" /><br/>
//               <button type="submit">submit</button>
//           </form>
//       `;
//       ctx.body=html;
//   }else if(ctx.url==='/' && ctx.method==='POST'){
//        let postData= ctx.request.body
//        ctx.body=postData;
//   }else{
//       ctx.body='<h1>404!</h1>';
//   }

// });

app.listen(9991, () => {
  console.log('koa2 已经开启')
});

