<template>
    <div class="card p-4 mx-3 my-2" style="width: 18rem;" >
        <div class="d-flex justify-content-between">
            <div>
                <h5 class="card-title">{{name}} {{surname}} </h5>
            </div>
            <div>
                <button type="button" class="btn btn-primary btn-sm text-end" @click="editUser(id)"> Edit user</button>
            </div>
        </div>
        <hr>
        <div>
            <p>Email: {{ email }}</p>
            <p>Phone: {{ phone }}</p>
            <p>Position: {{ position }}</p>
            <p>Active: {{ active }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['id',
                'name',
                'surname',
                'email',
                'phone',
                'position',
                'active'],

        methods: {
            editUser: function (id) {
                this.$router.push({path: '/users/'+id});
            }
        }
    }
</script>
