import { Controller, Get , Render , Request , Post , UseGuards, Body, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger/dist';
import { AuthService } from './auth/auth.service';
import { UserLoginDTO } from './auth/dto/userLogin.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ProductosService } from './productos/productos.service';
import { CreateUserDto } from './users/dto/create-user.dto';

@ApiTags('api')
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService,private readonly ProductosService: ProductosService) {

  }

  @Get()
  @Render('login')
  root(){
    return { message: 'Handlebars activo'}
  }
  
  @Get('/registro')
  @Render('registro')
  registro(){
    return { msg: 'aca se registra' }
  }
  @Post('login')
  async login(@Body() userLogin: UserLoginDTO){
    return await this.authService.login(userLogin)
  }

  @Post('register')
  registerUser(@Body() userObject: CreateUserDto){
    return this.authService.register(userObject)
  }
  @Get('/errorregister')
  @Render('errorRegister')
  errorRegister(){
    return { msg: 'Usuario existente' }
  }

  @Get('/errorlogin')
  @Render('errorLogin')
  errorLogin(){
    return { msg: 'Error al iniciar sesion' }
  }

  @Get('/registersuccess')
  @Render('registroSuccess')
  registroSuccess(){
    return { msg: 'Registrado correctamente' }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/home')
  @Render('home')
  async home(@Request() req){
    const productos = await this.ProductosService.listarTodo();
    const usuario = req.user;
    console.log(usuario)
    const userAvatar = ["img"] ;
    return { productos , usuario , userAvatar }
  }
  
  @Get(':id')
  @Render('product')
  async product(@Param('id') id: string){
    const productId = await this.ProductosService.listar(id)
    return { productId }
  }

  @Get('/cart')
  @Render('product')
  async cart(){
    return { msg: "aca va el carrito" }
  }

}
