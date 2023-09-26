<template>
    <div class="page-admin-connected-users">
        <div class="background">
            <div class="user-list">User List</div>
    
            <div class="users-tab">
                <div class="columns">
                    <div class="columns2">
                        <table>
                            <thead>
                                <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in users" :key="user.id">
                                <td>{{ user.id }}</td>
                                <td>{{ user.name }}</td>
                                <td>{{ user.email }}</td>
                                <td>{{ user.rentedBook }}</td>
                                <td>{{ user.library }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
            users: [],
            };
        },
        mounted() {
            axios.get('/api/users')
            .then(response => {
                this.users = response.data;
            })
            .catch(error => {
                console.error(error);
            });
        },
    };
</script>
            
