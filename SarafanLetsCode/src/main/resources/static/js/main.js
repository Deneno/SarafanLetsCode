



Vue.component('message-row', {
    props: ['message'],
    template: '<div><i>({{message.id}}) </i>{{message.text}}</div>'
})

Vue.component('messages-list', {
    props: ['messages'],
    template: '<div>' +
        '<message-row v-for="message in messages" :key="message.id" :message="message"></message-row>' +
        '</div>',
    created: function () {
        var messageApi = this.$resource('/message{/id}');
        messageApi.get().then(
            result => result.json().then(
                data => data.forEach(
                    message => this.messages.push(message)
                )
            )
        )
    }
})

var app = new Vue({
    el: '#app',
    template: '<messages-list :messages="messages" />',
    data: {
        messages: []
    }
})