<template>
  <div id="listView">
    <form @submit.prevent="submit" class="formView">
      <div class="lineHeight">
        <label for>标题</label>
        <input type="text" v-model="title" />
      </div>
      <div class="lineHeight">
        <label for>URL</label>
        <input type="text" v-model="url" />
      </div>
      <div class="lineHeight">
        <label for>讲师</label>
        <select v-model="teacher">
          <option v-for="(teacher, idx) in teachers" :key="idx">{{ teacher }}</option>
        </select>
      </div>
      <div class="lineHeight">
        <label for>完成</label>
        <input type="checkbox" v-model="completed" />
        {{completed}}
      </div>
      <div class="lineHeight">
        <label for>图片</label>
        <input type="file" accept="image/*" @change="fileSelected" />
        <br />
        <img :src="image" v-if="image" width="200" height="200" alt />
      </div>
      <input type="submit" value="Submit" />
    </form>
    <div class="showView" v-for="(lesson, idx) in lessons" :key="idx">
      <img :src="lesson.image" width="100" height="100" alt />
      <a :href="lesson.url"></a>
      <span>{{ lesson.title }}</span>
      <span>{{ lesson.teacher }}</span>
      <span>{{ lesson.completed === true ? '完成' : '未完成' }}</span>
    </div>
  </div>
</template>

<script>
const API = "http://localhost:8081/";
export default {
  data() {
    return {
      title: "",
      url: "",
      teachers: ["scars", "eason", "jack", "claire"],
      teacher: "",
      completed: false,
      image: "",
      lessons: []
    };
  },
  methods: {
    fileSelected(evt) {
      const file = evt.target.files.item(0);
      const reader = new FileReader();
      reader.addEventListener("load", this.imageLoaded);
      reader.readAsDataURL(file);
    },
    imageLoaded(evt) {
      this.image = evt.target.result;
    },
    submit() {
      $.post("http://localhost:8081", {
        title: this.title,
        url: this.url,
        teacher: this.teacher,
        completed: this.completed,
        image: this.image
      }).then(() => {
        this.title = "";
        this.url = "";
        this.teacher = "";
        this.completed = false;
        this.image = "";
        this.loadLessons();
      });
    },
    loadLessons() {
      $.get(API).then(lessons => (this.lessons = lessons));
    }
  },
  mounted() {
    // promise
    this.loadLessons();
  }
};
</script>

<style>
#listView {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 26px;
  width: 1000px;
  margin: 0 auto;
  font-weight: 300
}
.formView {
  border: 3px solid red;
  padding: 15px;
}
.showView {
  margin-top: 10px;
  border: 1px solid deepskyblue;
  padding: 15px;
}
.lineHeight {
  line-height: 50px;
}
label {
  display: inline-block;
  width: 20%;
}
input[type="text"] {
  display: inline-block;
  width: 75%;
  height: 10px;
  outline: 0;
  padding: 8px;
  line-height: 10px;

}
select {
  width: 77%;
  height: 30px;
  padding: 5px;
}
input[type="submit"] {
  display: inline-block;
  width: 100%;
  font-size: 22px;
  padding: 8px;
  border-radius: 8px;
  margin: 5px;
  border: none;
  outline: none;
  cursor: pointer;
  color: #fff;
  background-color: green;
  font-weight: 600
}
</style>
