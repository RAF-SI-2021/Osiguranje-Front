<template>
    <div class="card p-4" style="width: 18rem;" >
        <div class="d-flex justify-content-between">
            <div>
                <h5 class="card-title">Name Surname<!--{{name}}, {{surname}} --></h5>
            </div>
            <div>
                <button type="button" class="btn btn-primary btn-sm text-end" @click="editUser({id})"> Edit user</button>
            </div>
        </div>
        <hr>
        <div>
            <p>JMBG: {{ jmbg }} </p>
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
                'jmbg',
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
