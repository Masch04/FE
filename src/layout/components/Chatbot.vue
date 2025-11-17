<!-- src/layout/components/Chatbot.vue -->
<template>
  <div class="dialogflow-chat-container container-fluid p-0">
    <df-messenger
      intent="WELCOME"
      chat-title="chatbotkhachsan"
      agent-id="1dd2bc54-57b1-4d86-8878-42e0f48c5e42"
      language-code="vi"
      class="dialogflow-messenger-custom"
    ></df-messenger>
  </div>
</template>

<script>
export default {
  name: 'Chatbot',
  mounted() {
    const script = document.createElement('script');
    script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
    document.head.appendChild(script);
  }
}
</script>

<style scoped>
.dialogflow-chat-container {
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 100%;
  max-width: 380px;
  height: auto;
  max-height: 500px;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  overflow: hidden;
}

.dialogflow-messenger-custom {
  --df-messenger-bot-message: #878fac;
  --df-messenger-user-message: #479b3d;
  --df-messenger-chat-background: #f0f2f5;
  --df-messenger-font-color: white;
  --df-messenger-send-icon: #878fac;
  --df-messenger-button-title: #ffffff;
  --df-messenger-button-background-color: #479b3d;
  --df-messenger-border-radius: 15px;
  --df-messenger-border: 1px solid #ccc;
  width: 100%;
  height: 100%;
}

@media (max-width: 768px) {
  .dialogflow-chat-container {
    max-width: 90%;
    max-height: 450px;
    left: 5%;
    bottom: 15px;
  }
}

@media (min-width: 769px) and (max-width: 1200px) {
  .dialogflow-chat-container {
    max-width: 340px;
    max-height: 480px;
    left: 20px;
    bottom: 20px;
  }
}

@media (min-width: 1201px) {
  .dialogflow-chat-container {
    max-width: 380px;
    max-height: 500px;
    left: 20px;
    bottom: 20px;
  }
}
</style>

<!-- CSS toàn cục để force Dialogflow Messenger hiển thị xuống dòng -->
<style>
/* Force xuống dòng cho tin nhắn bot */
df-messenger::part(chat-bubble-text) {
  white-space: pre-line !important;
  word-wrap: break-word !important;
  line-height: 1.6 !important;
}

/* Thử thêm selector này nếu cách trên không hiệu quả */
df-messenger::part(message-text) {
  white-space: pre-wrap !important;
}

/* Force cho tất cả text trong messenger */
df-messenger * {
  white-space: pre-line !important;
}
</style>