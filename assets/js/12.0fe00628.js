(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{528:function(t,a,e){},565:function(t,a,e){"use strict";e(528)},638:function(t,a,e){"use strict";var n={name:"Home",data:function(){return{camera:null,scene:null,renderer:null,composer:null,mesh:null,height:600,width:"100%",cloudParticles:[]}},components:{NavLink:e(526).a},mounted:function(){},computed:{data:function(){return this.$page.frontmatter},actionLink:function(){return{link:this.data.actionLink,text:this.data.actionText}},actionLink2:function(){return{link:this.data.actionLink2,text:this.data.actionText2}}},methods:{},beforeDestroy:function(){}},i=(e(565),e(22)),s=Object(i.a)(n,(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("main",{staticClass:"home three-background",attrs:{"aria-labelledby":"main-title"}},[e("header",{staticClass:"hero",attrs:{id:"canvas-bg"}},[e("div",[t.data.heroImage?e("img",{attrs:{src:t.$withBase(t.data.heroImage),alt:t.data.heroAlt||"hero"}}):t._e()]),t._v(" "),null!==t.data.heroText?e("h1",{attrs:{id:"main-title"}},[t._v("\n      "+t._s(t.data.heroText||t.$title||"Hello")+"\n    ")]):t._e(),t._v(" "),null!==t.data.tagline?e("p",{staticClass:"description"},[t._v("\n      "+t._s(t.data.tagline||t.$description||"Welcome to your VuePress site")+"\n    ")]):t._e(),t._v(" "),t.data.actionText&&t.data.actionLink?e("p",{staticClass:"action"},[e("NavLink",{staticClass:"action-button",attrs:{item:t.actionLink}}),t._v(" "),e("NavLink",{staticClass:"action-button",attrs:{item:t.actionLink2}})],1):t._e()]),t._v(" "),e("Content",{staticClass:"theme-default-content custom"}),t._v(" "),t.data.features&&t.data.features.length?e("div",{staticClass:"features"},t._l(t.data.features,(function(a,n){return e("div",{key:n,staticClass:"feature"},[e("h2",[t._v("\n        "+t._s(a.title)+"\n      ")]),t._v(" "),e("recentPosts",{attrs:{category:a.category,show_tags:"false"}})],1)})),0):t._e(),t._v(" "),t.data.footer?e("div",{staticClass:"footer"},[t._v("\n    "+t._s(t.data.footer)+"\n  ")]):t._e()],1)}),[],!1,null,null,null);a.a=s.exports}}]);