class Routes {

  constructor(data) {
    this.data = data;
  }

  dashboard() {
    return `
    <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom p-3" id="navbar">
      <h4 class="mr-auto">Dashboard</h4>
    </nav>

    <div class="content">Choose a category on the left</div>
    `
  }

  category() {
    return `
    <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom p-3" id="navbar">
      <h4 class="mr-auto">Category</h4>
      <button @click="addEntry(${this.data.id})" x-show="$store.app.curPage == 'category'" class="btn btn-dark ml-auto">Add</button>
    </nav>

    <div class="content">
      <div class="list-group">
          <template x-for="entry in $store.data.entries.filter(x => x.cat_id == ${this.data.id})">
              <a :href="'/#/entry/'+entry.id" data-navigo class="list-group-item d-inline-block text-truncate" x-text="entry.title ? entry.title : 'Untitled'"></a>
          </template>
      </div>
    </div>`
  }

  entry() {
    return `
    <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom p-3" id="navbar">
      <h4 class="mr-auto">Entry</h4>
      <button @click="save" x-show="$store.app.curPage == 'entry'" class="btn btn-dark ml-auto" id="save">Save</button>
    </nav>

    <div class="content">
    <template x-for="entry in $store.data.entries.filter(x => x.id == '${this.data.id}')">
      <div>

        <div class="row">
          <div class="col-md-9">

            <b>Title</b>
            <input x-model="entry.title" class="form-control">
          </div>

          <div class="col-md-3">
            <b>Category</b>

            <select class="form-control" x-model="entry.cat_id">
              <template x-for="cat in $store.data.categories">
                <option :value="cat.id" x-text="cat.title" :selected="entry.cat_id == cat.id"></option>
              </template>
            </select>

          </div>
        </div>

        <b>Body</b>
        <textarea id="markdown-editor" x-model="entry.body" class="form-control"></textarea>

      </div>
    </template>
    </div>
    `

  }
}