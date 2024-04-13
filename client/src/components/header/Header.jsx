import { Badge, Input, message } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./index.css"
const Header = ({setSearch}) => {

  const cart = useSelector((state) => state.cart)
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const logout = () =>{
    if(window.confirm("Çıkış yapmak istediğinize emin misiniz?")){
      localStorage.removeItem("user");
      message.success("Çıkış işlemi başarılı")
      navigate("/login")
    }
  }


  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6 flex justify-between items-center gap-10">
        <div className="logo">
          <Link to={"/"}>
            <h2 className="text-2xl font-bold md:text-4xl">Fatih's PosApp</h2>
          </Link>
        </div>
        <div className="header-search flex-1 flex justify-center" onClick={() =>{
              pathname !== "/" && navigate("/")
            }}>
          <Input
            size="large"
            placeholder="Ürün Ara..."
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[800px]"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            
          />
        </div>
        <div className="menu-links">
          <Link
            to={"/"}
            className={`menu-link ${pathname === "/" && "active"}`}
          >
            <HomeOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Ana Sayfa</span>
          </Link>
          <Badge count={cart.cartItems.length} offset={[0,0]} className="md:flex hidden">
            <Link
              to={"/card"}
              className={`menu-link ${pathname === "/card" && "active"}`}
            >
              <ShoppingCartOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Sepet</span>
            </Link>
          </Badge>
          <Link
            to={"/bills"}
            className="menu-link "
          >
            <CopyOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Faturalar</span>
          </Link>
          <Link
            to={"/customers"}
            className={`menu-link ${pathname === "/customers" && "active"}`}
          >
            <UserOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Müşteriler</span>
          </Link>
          <Link
            to={"/statistics"}
            className={`menu-link ${pathname === "/statistics" && "active"}`}
          >
            <BarChartOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">İstatistikler</span>
          </Link>
          <Link
            className="menu-link"
            onClick={logout}
          >
            <LogoutOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Çıkış</span>
          </Link>
        </div>
        <Badge count={cart.cartItems.length} offset={[0,0]} className="md:hidden flex">
            <Link
              to={"/"}
              className="menu-link "
            >
              <ShoppingCartOutlined className="text-2xl" />
              <span className="md:text-xs text-[10px]">Sepet</span>
            </Link>
          </Badge>
      </header>
    </div>
  );
    };

  export default Header;