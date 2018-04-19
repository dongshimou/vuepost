<template>
<div>
<ul v-for="art in articles">
    <single-article :article="art"/>
</ul>
</div>
</template>

<script>

import SingleArticle from '@/components/single_article'
import GlobalData from '@/components/global'
export default {

components:{
    "single-article":SingleArticle,
    GlobalData
},
data(){
    return{
        articles:[]
    }
},
methods:{
    reloadData:function(){
        let address=GlobalData.inter+'/article'
        let now=new Date()    
        this.$http.get(address,{params:{
            "time":now.getTime(),
            "size":10,
        }}).then(res=>{
            let data=res.body.data.articles
            console.log(data.length)
            for(let i=0;i<data.length;i++){
                console.log(data[i])
                this.articles.push({
                    title:data[i].title,
                    context:data[i].context,
                    time:data[i].create_datetime,
                    tags:data[i].tags
                })
            }
        },res=>{

        })
    }
},

created(){
    this.reloadData()
}

}


</script>

<style>

</style>
