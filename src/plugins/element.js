import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  ColorPicker,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Tooltip,
  Select,
  Option,
  Container,
  Header,
  Aside,
  Main,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Menu,
  Card,
  Row,
  Col,
  Alert,
  TabPane,
  Tabs,
  Table,
  TableColumn,
  Pagination,
  Dialog,
  Switch,
  MessageBox,
  Tag,
  Breadcrumb,
  BreadcrumbItem
} from 'element-ui'

Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Menu)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Alert)
Vue.use(TabPane)
Vue.use(Tabs)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(ColorPicker)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Tooltip)
Vue.use(Select)
Vue.use(Option)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Switch)
Vue.use(Tag)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
