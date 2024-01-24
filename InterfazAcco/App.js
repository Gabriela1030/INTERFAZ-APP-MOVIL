 import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [showTransactionsSubMenu, setShowTransactionsSubMenu] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState("Mes");
  const [showCycleOptions, setShowCycleOptions] = useState(false);
  const [transactionData, setTransactionData] = useState([
    { month: 'Enero', amount: 1200 },
    { month: 'Febrero', amount: 900 },
    // Agrega más datos según sea necesario
  ]);
  const sidebarWidth = 200;

  const toggleMenu = () => {
    menuVisible ? hideMenu() : openMenu();
  };

  const closeMenu = () => {
    hideMenu();
  };

  const toggleTransactionsSubMenu = () => {
    setShowTransactionsSubMenu(!showTransactionsSubMenu);
  };

  const toggleCycleOptions = () => {
    setShowCycleOptions(!showCycleOptions);
  };

  const selectCycle = (cycle) => {
    setSelectedCycle(cycle);
    setShowCycleOptions(false);
    // Puedes agregar lógica adicional según la opción seleccionada
  };

  const sidebarTranslateX = new Animated.Value(-sidebarWidth);

  const openMenu = () => {
    Animated.timing(sidebarTranslateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setMenuVisible(true));
  };

  const hideMenu = () => {
    Animated.timing(sidebarTranslateX, {
      toValue: -sidebarWidth,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setMenuVisible(false);
      setShowTransactionsSubMenu(false);
    });
  };

  const sidebarStyle = {
    transform: [{ translateX: sidebarTranslateX }],
  };

  const contentStyle = {
    marginLeft: menuVisible ? sidebarWidth : 0,
  };

  const BarChartComponent = () => {
    const data = {
      labels: transactionData.map(item => item.month),
      datasets: [
        {
          data: transactionData.map(item => item.amount),
        },
      ],
    };

    return (
      <View style={styles.chartContainer}>
        <BarChart
          data={data}
          width={300}
          height={200}
          yAxisLabel={'$'}
          chartConfig={{
            backgroundColor: '#ffffff', // Fondo blanco del gráfico
            backgroundGradientFrom: '#ffffff', // Cambiado a blanco
            backgroundGradientTo: '#ffffff', // Cambiado a blanco
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(85, 195, 164, ${opacity})`, // Color de las barras
            labelColor: (opacity = 1) => `rgba(85, 195, 164, ${opacity})`, // Color de las etiquetas
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#007AFF', // Color del punto en cada barra
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
            alignSelf: 'center', // Alinea el gráfico en el centro
          }}
          verticalLabelRotation={30} // Rotación de las etiquetas en el eje X
          showValuesOnTopOfBars={true} // Mostrar los valores encima de las barras
          fromZero={true} // Iniciar el eje Y desde cero
          bezier // Suavizar las líneas del gráfico
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={contentStyle}>
        <Header onMenuPress={toggleMenu} />
        <TouchableOpacity style={styles.cycleButton} onPress={toggleCycleOptions}>
          <Text style={styles.cycleButtonText}>Ciclo: {selectedCycle}</Text>
        </TouchableOpacity>
        {showCycleOptions && (
          <CycleOptions onSelect={selectCycle} />
        )}
        <BarChartComponent />
        {/* Resto del contenido de la aplicación */}
      </ScrollView>
      <Animated.View style={[styles.sidebar, sidebarStyle]}>
        {menuVisible && (
          <Menu onClose={closeMenu}>
            <MenuItem text="Inicio" />
            <MenuItem text="Clientes" />
            <MenuItem text="Proveedores" />
            <MenuItem text="Transacciones" onPress={toggleTransactionsSubMenu} />
            {showTransactionsSubMenu && (
              <SubMenu>
                <SubMenuItem text="Compras" />
                <SubMenuItem text="Gastos" />
                <SubMenuItem text="Ingresos" />
              </SubMenu>
            )}
            <MenuItem text="Control de Inventario" />
            <MenuItem text="Crear Factura" />
          </Menu>
        )}
      </Animated.View>
    </View>
  );
};

const CycleOptions = ({ onSelect }) => {
  return (
    <View style={styles.cycleOptions}>
      <TouchableOpacity onPress={() => onSelect("Mes")}>
        <Text style={styles.cycleOptionText}>Mes</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("Semestre")}>
        <Text style={styles.cycleOptionText}>Semestre</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("Año")}>
        <Text style={styles.cycleOptionText}>Año</Text>
      </TouchableOpacity>
    </View>
  );
};

const Header = ({ onMenuPress }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
        <Text style={styles.menuButtonText}>☰</Text>
      </TouchableOpacity>
      <Image source={require('./IMG/logologo2.jpeg')} style={styles.navBrand} />
      <TouchableOpacity style={styles.searchButton}>
        <Icon name="search" size={20} color="#55c3a4" />
      </TouchableOpacity>
    </View>
  );
};

const Menu = ({ onClose, children }) => {
  return (
    <View style={styles.menu}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
      {children}
    </View>
  );
};

const MenuItem = ({ text, onPress }) => {
  return (
    <Text style={[styles.menuText, { marginBottom: 40 }]} onPress={onPress}>
      {text}
    </Text>
  );
};

const SubMenu = ({ children }) => {
  return <View style={styles.subMenu}>{children}</View>;
};

const SubMenuItem = ({ text }) => {
  return <Text style={styles.subNavLink}>{text}</Text>;
};

const ShowcaseImage = () => {
  return <Image source={require('./IMG/SHOWCASE36.jpg')} style={styles.showcaseImage} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row', // Puedes usar 'row' si prefieres una disposición horizontal
  },
  sidebar: {
    width: 200,
    backgroundColor: '#55c3a4',
    padding: 10,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  navBrand: {
    width: 160,
    height: 90,
  },
  searchButton: {
    padding: 10,
  },
  menuButton: {
    padding: 10,
  },

  menuButtonText: {
    fontSize: 24,
    color: '#55c3a4',
  },
  menu: {
    backgroundColor: '#55c3a4',
    padding: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#fff',
  },
  menuText: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 5,
  },
  subMenu: {
    backgroundColor: '#55c3a4',
    padding: 10,
    marginLeft: 10,
  },
  subNavLink: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 5,
  },
  showcaseImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cycleButton: {
    padding: 10,
    backgroundColor: '#55c3a4',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cycleButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  cycleOptions: {
    position: 'absolute',
    top: 60,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    elevation: 3,
  },
  cycleOptionText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
});


export default App;