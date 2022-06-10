<template>
        <div class="card p-4 mx-3 my-2" style="width: 18rem;">
            <div class="stock-news-item-img-container">
                <a class="stock-news-item" :href="url" target="_blank">
                    <img :src="image_url" class="card-img-top stock-news-item-img" :alt="snippet">
                </a>
            </div>
            <div>
                Published at: {{new Date(published_at).toLocaleDateString()}}
            </div>
            <hr>
            <a class="stock-news-item" :href="url" target="_blank">
                <div class="d-flex justify-content-between">
                    <div>
                        <h5 class="card-title">{{title}}</h5>
                    </div>
                    <div>
                        
                    </div>
                </div>
                <hr>
                <div>
                    <span>{{snippet}} </span>
                </div>
            </a>
        </div>
    
</template>
<script>
    export default {
        setup(props) {

        },
        props: ['title',
                'snippet',
                'published_at',
                'image_url',
                'description',
                'url']
    }
</script>
<style scoped>
    .stock-news-item  {
        color: grey;
    }

    .stock-news-item-img {
        width: 100%;
    }

    .stock-news-item-img-container {
        min-height: 200px;
    }
</style>
