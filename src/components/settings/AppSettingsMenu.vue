<template>
  <v-main>
    <v-data-table
            :headers="headers"
            :items="menuItens"
            :items-per-page="5"
            class="elevation-1"
            :loading="isLoading"
            loading-text="Loading... Please wait"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Menus</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="550px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              >New Menu</v-btn>
            </template>
            <v-card>
              <v-form ref="form" v-model="isValid">
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                                v-model="editedItem.title"
                                :rules="titleRules"
                                label="Title">
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <v-row align="baseline">
                      <v-col cols="1" sm="1" md="1">
                        <v-chip :color="editedItem.color">&nbsp;</v-chip>
                      </v-col>
                      <v-col cols="11" sm="5" md="5">
                        <v-text-field
                                v-model="editedItem.color"
                                :rules="colorRules"
                                label="Color">
                        </v-text-field>
                      </v-col>
                      <v-col cols="1" sm="1" md="1" justify="end" align="end">
                        <v-icon>{{ editedItem.icon }}</v-icon>
                      </v-col>
                      <v-col cols="11" sm="5" md="5">
                        <v-text-field
                                v-model="editedItem.icon"
                                :rules="iconRules"
                                label="Icon">
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.destination" label="Destination"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-select
                                :items="comboItens"
                                item-value="id"
                                item-text="title"
                                v-model="editedItem.app_menus_id"
                                label="Parent"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn dark tile color="red darken-3" @click="close">
                    <v-icon left>mdi-close</v-icon>
                    Cancel
                  </v-btn>
                  <v-btn :disabled="!isValid" :dark="isValid" tile color="green darken-3" @click="save">
                    <v-icon left>mdi-content-save</v-icon>
                    Save
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.color="{ item }">
        <v-chip :color="item.color">&nbsp;</v-chip>
      </template>

      <template v-slot:item.icon="{ item }">
        <v-icon>{{ item.icon }}</v-icon>
      </template>

      <template v-slot:item.app_menus_id="{ item }">
        {{ getParentName(item.app_menus_id) }}
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="fnLoadMenuData">Reset</v-btn>
      </template>
    </v-data-table>
    <v-container name="btnGroup">
      <v-row align="center" justify="end">
        <v-btn dark tile color="green darken-3" to='/settings'>
          <v-icon left>mdi-keyboard-return</v-icon>
          Back
        </v-btn>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
    import settingsMenuService from '@/services/settingsMenuService';

    export default {
        name: 'SettingsMenu',
        components: {
        },
        props: {
        },

        data: () => ({
            isLoading: true,
            isValid: false,
            loadMenuDataErro: false,
            saveErro: false,
            dialog: false,
            headers: [
                {
                    text: 'Name',
                    align: 'start',
                    sortable: false,
                    value: 'title',
                },
                { text: 'Color', value: 'color' },
                { text: 'Icon', value: 'icon' },
                { text: 'Destination', value: 'destination' },
                { text: 'Parent', value: 'app_menus_id' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            menuItens: [],
            comboItens: [],
            editedIndex: -1,
            editedItem: {
                id: null,
                color: '',
                destination: null,
                icon: '',
                title: '',
                app_menus_id: null,
            },
            defaultItem: {
                id: null,
                color: 'green darken-1',
                destination: null,
                icon: 'mdi-help',
                title: '',
                app_menus_id: null,
            },
            titleRules: [
                v => !!v || 'Title is required',
            ],
            colorRules: [
                v => !!v || 'Color is required',
            ],
            iconRules: [
                v => !!v || 'Icon is required',
            ],
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'New Menu' : 'Edit Menu'
            },
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
        },

        methods: {
            fnLoadMenuData: async function () {
                try {
                    this.loadMainMenuErro = false;

                    await settingsMenuService.loadMenuData({
                    }).then((resolve) => {
                        this.menuItens = resolve.data.data;
                        this.fnFiltraCombo();
                        this.isLoading=false;
                    });
                } catch (error) {
                    this.fnloadMainMenuErro();
                }
                this.close();
            },

            fnloadMainMenuErro() {
                this.loadMenuDataErro = true;
            },

            fnFiltraCombo: function(id) {
                this.comboItens = this.menuItens.filter(function (el) {
                    return el.id !== id &&
                           el.app_menus_id !== id;
                });
                this.comboItens.unshift(this.defaultItem);
            },

            fnTitleExistis: function(txt) {
                if(txt) {
                    return(this.menuItens.some(el => el.title.toLowerCase() === txt.toLowerCase()));
                }
                return(false);
            },

            getParentName: function (id) {
                let item = settingsMenuService.getParent(this.menuItens,id);
                if(item[0]){
                    return item[0].title;
                }
                return '-';
            },

            editItem: function (item) {
                this.editedIndex = this.menuItens.indexOf(item);
                this.fnFiltraCombo(item.id);
                this.editedItem = Object.assign({}, item);
                this.dialog = true;
            },

            deleteItem: async function (item) {
                if(confirm('Are you sure you want to delete menu "'+item.title+'"?')){
                    try {
                        await settingsMenuService.deleteMenuData(item)
                            .then(() => {
                                this.fnMenuDeleteOk(item.title);
                                this.fnLoadMenuData();
                            });
                    } catch (error) {
                        this.fnMenuErro(error.response.data.message);
                    }
                }
            },

            close: function () {
                this.dialog = false;
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1;
                });
                this.fnFiltraCombo();
                this.isValid = false;
            },

            save: async function () {
              try {
                  if (this.editedIndex > -1) {
                      await settingsMenuService.saveMenuData(this.editedItem)
                          .then(() => {
                              this.fnMenuSaveOk(this.editedItem.title);
                              this.fnLoadMenuData();
                          });
                  } else {

                      this.saveErro = false;
                      if(!this.fnTitleExistis(this.editedItem.title)) {
                      await settingsMenuService.saveMenuData(this.editedItem, true)
                        .then(() => {
                          this.fnMenuSaveOk(this.editedItem.title);
                          this.fnLoadMenuData();
                          this.close();
                        });
                      } else {
                          this.editedItem.title = '';
                          this.$store.commit('setAlertBox',['Menu Control','error','This Menu Title Already Exists!']);
                      }
                  }
              } catch (error) {
                  this.fnMenuErro(error.data.message);
              }
            },
            fnMenuErro(message) {
                this.$store.commit('setAlertBox',['Menu Control','error',message]);
            },
            fnMenuSaveOk(title) {
                this.$store.commit('setAlertBox',['Menu Control','success','Menu "'+title+'" Saved Successfully!']);
            },
            fnMenuDeleteOk(title) {
                this.$store.commit('setAlertBox',['Menu Control','success','Menu "'+title+'" Deleted Successfully!']);
            },
        },

        mounted: function () {
          this.fnLoadMenuData();
        },
    }
</script>

<style lang="scss" scoped>
  .v-text-field {
    padding-top: 0;
  }
  .testanim-enter-active, .testanim-leave-active {
    transition: all .5s;
  }
  .testanim-enter, .testanim-leave-to {
    transform: translateX(1rem);
    opacity: 0;
  }
  .testanim-leave-active {
    position: absolute;
  }
  .testanim-move {
    transition: all .5s;
  }
  tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, .05);
  }
</style>
