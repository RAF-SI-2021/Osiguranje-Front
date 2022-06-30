<template>
    <div class="card p-4 mx-3 my-2" style="width: 18rem;" >
        <div class="d-flex justify-content-evenly">
            <div>
                <h5 class="card-title">{{name}} {{surname}} </h5>
            </div>
            <div class="mx-2">
                <button type="button" class="btn btn-primary btn-sm" @click="editUser(id)"> Edit user</button>
            </div>
            <div class="mx-2">
                <button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal" @click="emitUser({ id: id, firstName: name, lastName: surname })" data-bs-target="#approveModal">Reset Limit</button>
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
    import { inject } from "vue";

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
            },
            emitUser: function(user) {
              this.$emitter.emit("reset", user);
            }
        }
    }
</script>
