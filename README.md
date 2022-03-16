1. Summary
Navigation.navigate('RouteName') pushes a new route to the stack navigator if it's not already in the stack, otherwise it jumps to that screen.
We can call navigation.push('RouteName') as many times as we like and it will continue pushing routes.
The header bar will automatically show a back button, but you can programmatically go back by calling navigation.goBack(). On Android, the hardware back button just works as expected.
You can go back to an existing screen in the stack with navigation.navigate('RouteName'), and you can go back to the first screen in the stack with navigation.popToTop().
The navigation prop is available to all screen components (components defined as screens in route configuration and rendered by React Navigation as a route).




2. Params
navigate and push accept an optional second argument to let you pass parameters to the route you are navigating to. 
For example: navigation.navigate('RouteName', {paramName: 'value'}).
You can read the params through route.params inside a screen
You can update the screen's params with navigation.setParams
Initial params can be passed via the initialParams prop on Screen

Sub: Thêm tham số thứ 2 là 1 object chứa data truyền cho màn hình (**)
  Bên màn hình(**) sử dụng {route} = this.props; { key }= route.params để lấy data
  Để update data trực tiếp bên màn hình(**) sử dụng method navigation.setParams({[Object Update]]})
  Khởi tạo params(initialParams) mặc định ban đầu bên props stack cha: <Stack.Screen name="Category" component={CategoryScreen} initialParams={{ title: 'test' }}/>

3. Header 
  Config options để thay đổi thiết lập header cho từng màn hình (set option in app.js)
  Để thay đổi giá trị của các option header trong màn hình hiện tại sử dụng method: this.props.navigation.setOptions({ [key Options Header]]: [Value Update]] })}

  Style Header:
  headerStyle: a style object that will be applied to the View that wraps the header. If you set backgroundColor on it, that will be the color of your header. (style cho thằng box ngoài)
  headerTintColor: the back button and title both use this property as their color. In the example below, we set the tint color to white (#fff) so the back button and the header title would be white. (style color cho text, icon)
  headerTitleStyle: if we want to customize the fontFamily, fontWeight and other Text style properties for the title, we can use this to do it. (style font cho text)
