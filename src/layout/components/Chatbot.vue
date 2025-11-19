<template>
  <div class="aihotel-chatbot">
    <!-- 
      Tôi đã thêm thuộc tính chat-icon để đổi icon tia sét mặc định thành icon lễ tân/tai nghe 
      cho phù hợp với khách sạn. Bạn có thể thay link ảnh khác nếu muốn.
    -->
    <df-messenger
      intent="WELCOME"
      chat-title="Hỗ trợ viên AIHOTEL"
      agent-id="1dd2bc54-57b1-4d86-8878-42e0f48c5e42"
      language-code="vi"
      chat-icon="https://cdn-icons-png.flaticon.com/512/4233/4233830.png"
    ></df-messenger>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

// Tự động nhúng script của Dialogflow khi component được load
// Giúp bạn không phải sửa file index.html
onMounted(() => {
  if (!document.querySelector('script[src*="dialogflow-console/fast/messenger/bootstrap.js"]')) {
    const script = document.createElement('script');
    script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
    script.async = true;
    document.body.appendChild(script);
  }
});
</script>

<style>
/* 
  LƯU Ý: Style này không để 'scoped' vì df-messenger là web component bên ngoài.
  Tôi đã cấu hình màu sắc theo đúng tông Vàng/Đen của web AIHOTEL PRO.
*/

df-messenger {
  /* --- 1. MÀU SẮC CHỦ ĐẠO (THEO WEB KHÁCH SẠN) --- */
  
  /* Màu nút tròn icon chat & Thanh tiêu đề (Màu Vàng Gold lấy từ nút web của bạn) */
  --df-messenger-button-titlebar-color: #cda050; 
  
  /* Màu nền bên trong khung chat (Trắng ngà nhẹ cho sang) */
  --df-messenger-chat-background-color: #ffffff;
  
  /* Màu chữ trên thanh tiêu đề */
  --df-messenger-button-titlebar-font-color: #ffffff;
  
  /* --- 2. BONG BÓNG CHAT --- */
  
  /* Tin nhắn của Khách (Màu Vàng Gold đồng bộ) */
  --df-messenger-user-message: #cda050;
  
  /* Tin nhắn của Bot (Màu xám nhạt sạch sẽ) */
  --df-messenger-bot-message: #f5f5f5;
  
  /* Màu chữ trong bong bóng chat */
  --df-messenger-font-color: #333333;
  
  /* --- 3. CÁC CHI TIẾT KHÁC --- */
  
  /* Màu icon nút gửi tin nhắn */
  --df-messenger-send-icon: #cda050;
  
  /* Vị trí cố định góc phải màn hình */
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}

/* Tùy chỉnh nút chat (Shadow DOM) - Tạo hiệu ứng bóng đổ sang trọng */
df-messenger::part(button) {
  box-shadow: 0 4px 20px rgba(205, 160, 80, 0.4);
  border: 2px solid #fff; /* Viền trắng mỏng làm nổi bật nút vàng */
}

/* Tùy chỉnh khung chat khi mở ra */
df-messenger::part(chat-wrapper) {
  border-radius: 12px;
  box-shadow: 0 5px 40px rgba(0,0,0,0.3);
}
</style>