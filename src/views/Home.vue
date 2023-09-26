<template>
  <section>
    <h1>Test</h1>
    <div class="home">
      <div class="carousel">
        <div v-for="book in books" :key="book.id" class="book-card">
          <img :src="book.cover" class="book-cover" />
          <div class="book-details">
            <div class="rating">
              <span class="star" v-for="star in book.rating" :key="star"></span>
            </div>
            <h3 class="title">{{ book.title }}</h3>
            <p class="author">{{ book.author }}</p>
            <p class="description">{{ book.description }}</p>
          </div>
        </div>
      </div>
      <!-- Add other divs as needed -->
    </div></section>
</template>
  
  <script>
  export default {
    data() {
      return {
        books: [
          {
            id: 1,
            cover: '@/coverPageEbook/Cover_Page_1.jpg',
            rating: 4,
            title: 'The concrete ',
            author: 'Author 1',
            description: 'Short description for Book 1',
          },
          // Add more book examples here
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .home {
    background-color: #d9d9d9;
  }
  
  .carousel {
    display: flex;
    overflow-x: auto;
    padding: 20px;
  }
  
  .book-card {
    margin-right: 20px;
    background-color: #f1f1f1;
    border-radius: 16px;
    box-shadow: 6px 6px 12px #c7c7c7, -6px -6px 12px #ffffff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .book-cover {
    width: 200px;
    height: 300px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .book-details {
    margin-top: 16px;
    text-align: center;
  }
  
  .rating {
    margin-bottom: 8px;
  }
  
  .star {
    color: #ffd700;
    font-size: 18px;
  }
  
  .title {
    font-size: 24px;
    font-weight: bold;
  }
  
  .author {
    font-size: 16px;
    margin-bottom: 8px;
  }
  
  .description {
    font-size: 14px;
  }
  </style>
  