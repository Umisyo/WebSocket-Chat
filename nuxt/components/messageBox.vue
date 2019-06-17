<template>
  <div>
    <figure class="media-left">
      <p class="image is-64x64">
        <img src="https://bulma.io/images/placeholders/128x128.png">
      </p>
    </figure>
    <div class="media-content">
        <div class="content">
            <p>
                >
                <strong>User: {{ message.user }}</strong>
                <br>
                {{ message.text }}
                <br>
                <small>
                    <a>Like</a>
                    <a>Reply</a>
                    . {{ message.date }}
                </small>
            </p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        message: Object
    }
}
</script>

