/* ============ 芯汇通 SourcIC · Mock 数据层 ============
   说明：原型阶段用前端静态数据模拟后端接口。
   正式版本对应 REST/GraphQL 接口，见 docs/商业计划书.md 第 7 章数据模型。
====================================================== */

/* ---------- 器件分类树（参考行业主流参数化分类体系，按库存交易场景裁剪） ---------- */
const CATEGORIES = [
  { icon:'▣', name:'集成电路 IC', subs:['微控制器 MCU','数字信号处理 DSP','FPGA/CPLD','存储器','放大器','数据转换 ADC/DAC','接口芯片','时钟与计时','逻辑芯片','专用芯片 ASSP'] },
  { icon:'⚡', name:'电源管理', subs:['DC-DC 转换器','LDO 稳压器','电源监控','栅极驱动','电池管理 BMS','AC-DC 控制器','负载开关','电源模块'] },
  { icon:'◈', name:'分立半导体', subs:['MOSFET','三极管','IGBT','二极管','肖特基','稳压二极管','晶闸管','碳化硅 SiC'] },
  { icon:'▤', name:'被动元件', subs:['贴片电阻','贴片电容','电解电容','钽电容','薄膜电容','功率电感','磁珠','共模电感','排阻'] },
  { icon:'⚯', name:'连接器', subs:['板对板','线对板','FPC/FFC','USB/Type-C','射频同轴','端子台','排针排母','卡座','汽车连接器'] },
  { icon:'◉', name:'传感器', subs:['温湿度','压力','加速度/陀螺','光学/接近','电流','气体','霍尔','图像 CIS'] },
  { icon:'✳', name:'光电器件', subs:['LED 指示','大功率 LED','光耦','数码管','LCD/OLED 模组','激光','红外接收'] },
  { icon:'◐', name:'晶体与振荡器', subs:['无源晶振','有源晶振 OSC','TCXO','VCXO','陶瓷谐振器','实时时钟晶体'] },
  { icon:'▥', name:'射频/无线', subs:['WiFi 模组','蓝牙模组','LoRa','4G/5G 模组','GNSS 定位','射频前端','天线','滤波器'] },
  { icon:'⊙', name:'机电与保护', subs:['继电器','轻触开关','拨码开关','保险丝','TVS 二极管','ESD 保护','压敏电阻','热敏电阻 NTC'] },
  { icon:'▦', name:'模块与开发板', subs:['电源模块','核心板','开发板','摄像头模组','显示模组','以太网模块'] },
  { icon:'◇', name:'其他/物料', subs:['结构件','散热片','线材','PCB 板材','焊接耗材','包装材料'] }
];

/* ---------- 品牌厂家库（含官网链接，详情页可直达原厂） ---------- */
const BRANDS = {
  'STMicroelectronics':{ cn:'意法半导体', url:'https://www.st.com', origin:'欧洲' },
  'Texas Instruments':{ cn:'德州仪器', url:'https://www.ti.com.cn', origin:'美国' },
  'Infineon':{ cn:'英飞凌', url:'https://www.infineon.com/cms/cn/', origin:'欧洲' },
  'NXP':{ cn:'恩智浦', url:'https://www.nxp.com.cn', origin:'欧洲' },
  'Microchip':{ cn:'微芯', url:'https://www.microchip.com', origin:'美国' },
  'ADI':{ cn:'亚德诺', url:'https://www.analog.com/cn', origin:'美国' },
  'Murata':{ cn:'村田', url:'https://www.murata.com/zh-cn', origin:'日本' },
  'Samsung':{ cn:'三星电机', url:'https://www.samsungsem.com/cn/', origin:'韩国' },
  'YAGEO':{ cn:'国巨', url:'https://www.yageo.com/zh-CN/', origin:'中国台湾' },
  'TDK':{ cn:'TDK', url:'https://www.tdk.com.cn', origin:'日本' },
  'Espressif':{ cn:'乐鑫科技', url:'https://www.espressif.com.cn', origin:'中国大陆' },
  'GigaDevice':{ cn:'兆易创新', url:'https://www.gigadevice.com.cn', origin:'中国大陆' },
  'Will Semiconductor':{ cn:'韦尔股份', url:'https://www.will-semi.com', origin:'中国大陆' },
  'JLC / 立创':{ cn:'立创商城自营', url:'https://www.szlcsc.com', origin:'中国大陆' },
  'Vishay':{ cn:'威世', url:'https://www.vishay.com.cn', origin:'美国' },
  'Nexperia':{ cn:'安世半导体', url:'https://www.nexperia.cn', origin:'欧洲' },
  'Winbond':{ cn:'华邦电子', url:'https://www.winbond.com', origin:'中国台湾' },
  'Amphenol':{ cn:'安费诺', url:'https://www.amphenol.com', origin:'美国' },
  'JST':{ cn:'JST 日压', url:'https://www.jst-mfg.com/index_zh.php', origin:'日本' },
  'Sensirion':{ cn:'盛思锐', url:'https://sensirion.com/cn/', origin:'欧洲' }
};

/* ---------- 卖家（代理商 / 贸易商 / 工厂库存） ---------- */
const SELLERS = {
  S01:{ name:'深圳market芯联电子有限公司', type:'授权代理商', city:'深圳', years:11, rating:4.9, deals:2860, resp:'≤15分钟', verified:true, bond:'保证金 ¥100,000', ship:'当日 17:00 前下单当天发' },
  S02:{ name:'东莞恒芯电子贸易有限公司', type:'独立贸易商', city:'东莞·长安', years:6, rating:4.7, deals:1204, resp:'≤30分钟', verified:true, bond:'保证金 ¥50,000', ship:'1 个工作日内发货' },
  S03:{ name:'苏州兆丰智能制造有限公司', type:'工厂呆料', city:'苏州·工业园', years:14, rating:4.8, deals:318, resp:'≤2小时', verified:true, bond:'保证金 ¥50,000', ship:'2 个工作日内发货' },
  S04:{ name:'上海derek微电子有限公司', type:'授权代理商', city:'上海·张江', years:9, rating:4.9, deals:1970, resp:'≤20分钟', verified:true, bond:'保证金 ¥100,000', ship:'当日发货' },
  S05:{ name:'香港环宇国际电子（HK）', type:'独立贸易商', city:'中国香港', years:8, rating:4.6, deals:876, resp:'≤1小时', verified:true, bond:'保证金 ¥50,000', ship:'跨境 2-3 天' },
  S06:{ name:'成都星链电子科技有限公司', type:'原厂直营', city:'成都·高新', years:5, rating:4.8, deals:540, resp:'≤40分钟', verified:true, bond:'保证金 ¥200,000', ship:'1-2 个工作日' }
};

/* ---------- 库存商品（每条 = 一个卖家的一批库存 SKU） ---------- */
const PRODUCTS = [
  {
    id:'P1001', mpn:'STM32F103C8T6', brand:'STMicroelectronics', cat:'集成电路 IC', sub:'微控制器 MCU',
    desc:'ARM Cortex-M3 32位 MCU，64KB Flash / 20KB RAM，72MHz，LQFP-48',
    pkg:'LQFP-48', packing:'2500pcs/Reel', dateCode:'2024+', qty:87500, moq:100, icon:'ic',
    quality:'全新原装', rohs:true, seller:'S01', leadtime:'现货',
    tiers:[{q:100,p:8.62},{q:1000,p:7.94},{q:10000,p:7.35},{q:50000,p:6.88}],
    specs:{'内核':'ARM Cortex-M3','主频':'72 MHz','Flash':'64 KB','SRAM':'20 KB','工作电压':'2.0 V ~ 3.6 V','I/O 数':'37','ADC':'2×12bit / 10通道','通信接口':'2×I²C, 3×USART, 2×SPI, CAN, USB','工作温度':'-40°C ~ +85°C','封装':'LQFP-48 (7×7mm)'}
  },
  {
    id:'P1002', mpn:'ESP32-WROOM-32E', brand:'Espressif', cat:'射频/无线', sub:'WiFi 模组',
    desc:'WiFi + BLE 双模组，双核 240MHz，4MB Flash，PCB 板载天线',
    pkg:'SMD-38', packing:'800pcs/Tray', dateCode:'2025+', qty:12400, moq:50, icon:'module',
    quality:'全新原装', rohs:true, seller:'S06', leadtime:'现货',
    tiers:[{q:50,p:22.50},{q:500,p:20.80},{q:2000,p:19.40},{q:10000,p:18.20}],
    specs:{'无线标准':'802.11 b/g/n + BLE 4.2','内核':'Xtensa LX6 双核','主频':'240 MHz','Flash':'4 MB','SRAM':'520 KB','天线':'板载 PCB 天线','发射功率':'20 dBm','工作温度':'-40°C ~ +85°C','尺寸':'18 × 25.5 × 3.1 mm'}
  },
  {
    id:'P1003', mpn:'GRM188R71H104KA93D', brand:'Murata', cat:'被动元件', sub:'贴片电容',
    desc:'MLCC 陶瓷电容 0.1µF ±10% 50V X7R 0603',
    pkg:'0603', packing:'4000pcs/Reel', dateCode:'2025+', qty:2480000, moq:4000, icon:'cap',
    quality:'全新原装', rohs:true, seller:'S02', leadtime:'现货',
    tiers:[{q:4000,p:0.0186},{q:40000,p:0.0158},{q:200000,p:0.0132},{q:1000000,p:0.0114}],
    specs:{'容值':'0.1 µF','容差':'±10%','额定电压':'50 V DC','介质材料':'X7R','封装':'0603 (1608 Metric)','工作温度':'-55°C ~ +125°C','端子':'镀锡','厚度':'0.8 mm'}
  },
  {
    id:'P1004', mpn:'TPS54331DR', brand:'Texas Instruments', cat:'电源管理', sub:'DC-DC 转换器',
    desc:'3A 降压 DC-DC 转换器，输入 3.5-28V，570kHz，SOIC-8',
    pkg:'SOIC-8', packing:'2500pcs/Reel', dateCode:'2024+', qty:38000, moq:100, icon:'ic',
    quality:'全新原装', rohs:true, seller:'S04', leadtime:'现货',
    tiers:[{q:100,p:4.35},{q:1000,p:3.92},{q:5000,p:3.55},{q:20000,p:3.28}],
    specs:{'类型':'同步降压 Buck','输入电压':'3.5 V ~ 28 V','输出电流':'3 A','开关频率':'570 kHz','输出电压':'0.8 V ~ 25 V 可调','效率':'最高 95%','工作温度':'-40°C ~ +150°C','封装':'SOIC-8 (D)'}
  },
  {
    id:'P1005', mpn:'AO3400A', brand:'Nexperia', cat:'分立半导体', sub:'MOSFET',
    desc:'N 沟道 MOSFET 30V 5.7A SOT-23，Rds(on) 28mΩ',
    pkg:'SOT-23', packing:'3000pcs/Reel', dateCode:'2025+', qty:456000, moq:3000, icon:'mos',
    quality:'全新原装', rohs:true, seller:'S02', leadtime:'现货',
    tiers:[{q:3000,p:0.132},{q:30000,p:0.118},{q:150000,p:0.098},{q:450000,p:0.086}],
    specs:{'类型':'N 沟道增强型','Vds':'30 V','Id':'5.7 A','Rds(on)':'28 mΩ @ 10V','Vgs(th)':'0.65 V ~ 1.45 V','功率耗散':'1.4 W','封装':'SOT-23-3','工作温度':'-55°C ~ +150°C'}
  },
  {
    id:'P1006', mpn:'W25Q128JVSIQ', brand:'Winbond', cat:'集成电路 IC', sub:'存储器',
    desc:'128Mbit SPI NOR Flash，133MHz，SOIC-8 208mil',
    pkg:'SOIC-8', packing:'2000pcs/Reel', dateCode:'2024+', qty:19600, moq:100, icon:'ic',
    quality:'全新原装', rohs:true, seller:'S01', leadtime:'现货',
    tiers:[{q:100,p:6.85},{q:1000,p:6.12},{q:5000,p:5.68},{q:15000,p:5.30}],
    specs:{'容量':'128 Mbit (16 MB)','接口':'SPI / Dual / Quad SPI','时钟频率':'133 MHz','工作电压':'2.7 V ~ 3.6 V','擦写次数':'100,000 次','数据保存':'20 年','封装':'SOIC-8 208mil','工作温度':'-40°C ~ +85°C'}
  },
  {
    id:'P1007', mpn:'RC0603FR-0710KL', brand:'YAGEO', cat:'被动元件', sub:'贴片电阻',
    desc:'厚膜贴片电阻 10kΩ ±1% 1/10W 0603',
    pkg:'0603', packing:'5000pcs/Reel', dateCode:'2025+', qty:8600000, moq:5000, icon:'res',
    quality:'全新原装', rohs:true, seller:'S02', leadtime:'现货',
    tiers:[{q:5000,p:0.0062},{q:50000,p:0.0051},{q:500000,p:0.0043},{q:2000000,p:0.0036}],
    specs:{'阻值':'10 kΩ','精度':'±1%','额定功率':'1/10 W (0.1W)','温度系数':'±100 ppm/°C','封装':'0603','最大工作电压':'75 V','工作温度':'-55°C ~ +155°C'}
  },
  {
    id:'P1008', mpn:'GD32F103RCT6', brand:'GigaDevice', cat:'集成电路 IC', sub:'微控制器 MCU',
    desc:'ARM Cortex-M3 MCU，256KB Flash / 48KB RAM，108MHz，LQFP-64（国产替代）',
    pkg:'LQFP-64', packing:'1500pcs/Tray', dateCode:'2025+', qty:24000, moq:100, icon:'ic',
    quality:'全新原装', rohs:true, seller:'S06', leadtime:'现货',
    tiers:[{q:100,p:11.80},{q:1000,p:10.60},{q:5000,p:9.85},{q:20000,p:9.20}],
    specs:{'内核':'ARM Cortex-M3','主频':'108 MHz','Flash':'256 KB','SRAM':'48 KB','工作电压':'2.6 V ~ 3.6 V','I/O 数':'51','封装':'LQFP-64 (10×10mm)','兼容性':'Pin-to-Pin 兼容 STM32F103RCT6','工作温度':'-40°C ~ +85°C'}
  },
  {
    id:'P1009', mpn:'SHT30-DIS-B2.5KS', brand:'Sensirion', cat:'传感器', sub:'温湿度',
    desc:'数字温湿度传感器，±2%RH / ±0.2°C，I²C，DFN-8',
    pkg:'DFN-8', packing:'2500pcs/Reel', dateCode:'2024+', qty:7800, moq:100, icon:'sensor',
    quality:'全新原装', rohs:true, seller:'S04', leadtime:'现货',
    tiers:[{q:100,p:16.40},{q:1000,p:14.90},{q:2500,p:13.80},{q:7500,p:12.95}],
    specs:{'湿度精度':'±2 %RH','温度精度':'±0.2 °C','湿度量程':'0 ~ 100 %RH','温度量程':'-40 °C ~ +125 °C','接口':'I²C（最高 1 MHz）','工作电压':'2.15 V ~ 5.5 V','功耗':'典型 4.8 µW','封装':'DFN-8 (2.5×2.5mm)'}
  },
  {
    id:'P1010', mpn:'1-1734248-0', brand:'Amphenol', cat:'连接器', sub:'FPC/FFC',
    desc:'FPC 连接器 0.5mm 间距 10Pin 卧贴 下接',
    pkg:'SMD', packing:'5000pcs/Reel', dateCode:'2024+', qty:64000, moq:1000, icon:'conn',
    quality:'全新原装', rohs:true, seller:'S03', leadtime:'现货',
    tiers:[{q:1000,p:0.86},{q:10000,p:0.74},{q:30000,p:0.66},{q:60000,p:0.58}],
    specs:{'间距':'0.5 mm','位数':'10 Pin','连接方式':'翻盖式下接','额定电流':'0.5 A','额定电压':'50 V AC','接触电阻':'≤ 50 mΩ','插拔寿命':'20 次','封装':'SMD 卧贴'}
  },
  {
    id:'P1011', mpn:'MMBT3904LT1G', brand:'Vishay', cat:'分立半导体', sub:'三极管',
    desc:'NPN 通用晶体管 40V 200mA SOT-23',
    pkg:'SOT-23', packing:'3000pcs/Reel', dateCode:'2023+', qty:1250000, moq:3000, icon:'mos',
    quality:'全新原装', rohs:true, seller:'S05', leadtime:'现货',
    tiers:[{q:3000,p:0.058},{q:30000,p:0.049},{q:300000,p:0.041},{q:900000,p:0.035}],
    specs:{'类型':'NPN 双极型','Vceo':'40 V','Ic':'200 mA','hFE':'100 ~ 300','fT':'300 MHz','功率耗散':'350 mW','封装':'SOT-23-3','工作温度':'-55°C ~ +150°C'}
  },
  {
    id:'P1012', mpn:'CL10A106MP8NNNC', brand:'Samsung', cat:'被动元件', sub:'贴片电容',
    desc:'MLCC 陶瓷电容 10µF ±20% 10V X5R 0603',
    pkg:'0603', packing:'3000pcs/Reel', dateCode:'2025+', qty:930000, moq:3000, icon:'cap',
    quality:'全新原装', rohs:true, seller:'S01', leadtime:'现货',
    tiers:[{q:3000,p:0.0625},{q:30000,p:0.0548},{q:150000,p:0.0472},{q:600000,p:0.0418}],
    specs:{'容值':'10 µF','容差':'±20%','额定电压':'10 V DC','介质材料':'X5R','封装':'0603','工作温度':'-55°C ~ +85°C','厚度':'0.9 mm'}
  },
  {
    id:'P1013', mpn:'IRF540NSTRLPBF', brand:'Infineon', cat:'分立半导体', sub:'MOSFET',
    desc:'N 沟道功率 MOSFET 100V 33A D2PAK，Rds(on) 44mΩ',
    pkg:'D2PAK', packing:'800pcs/Reel', dateCode:'2023+', qty:9600, moq:100, icon:'mos',
    quality:'原厂拆板料', rohs:true, seller:'S03', leadtime:'现货',
    tiers:[{q:100,p:6.20},{q:800,p:5.55},{q:3200,p:5.05},{q:9600,p:4.60}],
    specs:{'类型':'N 沟道','Vds':'100 V','Id':'33 A','Rds(on)':'44 mΩ @ 10V','Qg':'71 nC','功率耗散':'130 W','封装':'D2PAK (TO-263)','工作温度':'-55°C ~ +175°C'}
  },
  {
    id:'P1014', mpn:'B57861S0103F040', brand:'TDK', cat:'机电与保护', sub:'热敏电阻 NTC',
    desc:'NTC 热敏电阻 10kΩ ±1% B=3988K 玻封探头',
    pkg:'轴向', packing:'1000pcs/Bag', dateCode:'2024+', qty:18000, moq:500, icon:'res',
    quality:'全新原装', rohs:true, seller:'S05', leadtime:'现货',
    tiers:[{q:500,p:2.34},{q:2000,p:2.06},{q:8000,p:1.84},{q:18000,p:1.68}],
    specs:{'R25 阻值':'10 kΩ','精度':'±1%','B 值':'3988 K (25/100°C)','耗散系数':'1.5 mW/K','热时间常数':'≤ 12 s','工作温度':'-55°C ~ +155°C','封装':'玻璃封装轴向引线'}
  },
  {
    id:'P1015', mpn:'LM358DR', brand:'Texas Instruments', cat:'集成电路 IC', sub:'放大器',
    desc:'双路通用运算放大器，单电源 3-32V，SOIC-8',
    pkg:'SOIC-8', packing:'2500pcs/Reel', dateCode:'2024+', qty:145000, moq:2500, icon:'ic',
    quality:'全新原装', rohs:true, seller:'S02', leadtime:'现货',
    tiers:[{q:2500,p:0.485},{q:25000,p:0.428},{q:75000,p:0.386},{q:145000,p:0.352}],
    specs:{'通道数':'2','增益带宽积':'1.1 MHz','压摆率':'0.6 V/µs','供电电压':'3 V ~ 32 V（单电源）','输入失调电压':'典型 3 mV','静态电流':'0.7 mA','封装':'SOIC-8','工作温度':'0°C ~ +70°C'}
  },
  {
    id:'P1016', mpn:'X322512MSB4SI', brand:'YAGEO', cat:'晶体与振荡器', sub:'无源晶振',
    desc:'贴片无源晶振 12MHz ±10ppm 20pF 3225 四脚',
    pkg:'SMD-3225', packing:'3000pcs/Reel', dateCode:'2025+', qty:72000, moq:1000, icon:'xtal',
    quality:'全新原装', rohs:true, seller:'S04', leadtime:'现货',
    tiers:[{q:1000,p:0.72},{q:10000,p:0.63},{q:36000,p:0.56},{q:72000,p:0.50}],
    specs:{'频率':'12.000 MHz','频差':'±10 ppm','负载电容':'20 pF','ESR':'≤ 60 Ω','频率温漂':'±10 ppm','封装':'SMD 3225 (3.2×2.5mm)','工作温度':'-20°C ~ +70°C'}
  },
  {
    id:'P1017', mpn:'0805 白光 6500K', brand:'Will Semiconductor', cat:'光电器件', sub:'LED 指示',
    desc:'贴片 LED 白光 0805 6500K 亮度 260-320mcd',
    pkg:'0805', packing:'3000pcs/Reel', dateCode:'2025+', qty:1560000, moq:3000, icon:'led',
    quality:'全新原装', rohs:true, seller:'S06', leadtime:'现货',
    tiers:[{q:3000,p:0.0295},{q:30000,p:0.0256},{q:300000,p:0.0218},{q:1200000,p:0.0186}],
    specs:{'颜色':'白光 6500K','亮度':'260 ~ 320 mcd','正向电压':'2.8 V ~ 3.4 V','正向电流':'20 mA','视角':'120°','封装':'0805 (2012 Metric)','工作温度':'-40°C ~ +85°C'}
  },
  {
    id:'P1018', mpn:'B3F-1000', brand:'JST', cat:'机电与保护', sub:'轻触开关',
    desc:'轻触开关 6×6×5mm 插件 4脚 力度 160gf',
    pkg:'DIP-4', packing:'1000pcs/Bag', dateCode:'2024+', qty:230000, moq:1000, icon:'sw',
    quality:'全新原装', rohs:true, seller:'S03', leadtime:'现货',
    tiers:[{q:1000,p:0.126},{q:10000,p:0.108},{q:50000,p:0.094},{q:200000,p:0.082}],
    specs:{'尺寸':'6 × 6 × 5 mm','操作力':'160 ± 50 gf','额定电流':'50 mA @ 12V DC','接触电阻':'≤ 100 mΩ','机械寿命':'100,000 次','安装方式':'插件 DIP','工作温度':'-25°C ~ +70°C'}
  },
  {
    id:'P1019', mpn:'SS8050', brand:'Nexperia', cat:'分立半导体', sub:'三极管',
    desc:'NPN 三极管 25V 1.5A SOT-23（工厂呆料·可议价）',
    pkg:'SOT-23', packing:'3000pcs/Reel', dateCode:'2021+', qty:660000, moq:30000, icon:'mos',
    quality:'库存呆料', rohs:true, seller:'S03', leadtime:'现货',
    tiers:[{q:30000,p:0.032},{q:150000,p:0.026},{q:400000,p:0.021},{q:660000,p:0.018}],
    specs:{'类型':'NPN','Vceo':'25 V','Ic':'1.5 A','hFE':'85 ~ 300','功率耗散':'1 W','封装':'SOT-23','备注':'2021 年批次，外观完好、原厂盘装未拆封','工作温度':'-55°C ~ +150°C'}
  },
  {
    id:'P1020', mpn:'MCP2515-I/SO', brand:'Microchip', cat:'集成电路 IC', sub:'接口芯片',
    desc:'独立 CAN 控制器，SPI 接口，CAN 2.0B，SOIC-18',
    pkg:'SOIC-18', packing:'1000pcs/Tube', dateCode:'2024+', qty:6400, moq:100, icon:'ic',
    quality:'全新原装', rohs:true, seller:'S01', leadtime:'现货',
    tiers:[{q:100,p:9.80},{q:500,p:8.95},{q:2000,p:8.30},{q:6000,p:7.75}],
    specs:{'协议':'CAN 2.0B 主动','速率':'最高 1 Mb/s','主机接口':'SPI（最高 10 MHz）','工作电压':'2.7 V ~ 5.5 V','缓冲区':'3 发送 / 2 接收','封装':'SOIC-18','工作温度':'-40°C ~ +85°C'}
  },
  {
    id:'P1021', mpn:'SRR1260-100M', brand:'TDK', cat:'被动元件', sub:'功率电感',
    desc:'屏蔽功率电感 10µH ±20% 6.5A 12.5×12.5mm',
    pkg:'SMD-1260', packing:'500pcs/Reel', dateCode:'2024+', qty:26000, moq:500, icon:'ind',
    quality:'全新原装', rohs:true, seller:'S02', leadtime:'现货',
    tiers:[{q:500,p:3.28},{q:2500,p:2.94},{q:10000,p:2.66},{q:25000,p:2.42}],
    specs:{'电感量':'10 µH','容差':'±20%','额定电流':'6.5 A','饱和电流':'7.4 A','直流电阻':'22 mΩ','自谐振频率':'12 MHz','尺寸':'12.5 × 12.5 × 6 mm','工作温度':'-40°C ~ +125°C'}
  },
  {
    id:'P1022', mpn:'USB4110-GF-A', brand:'Amphenol', cat:'连接器', sub:'USB/Type-C',
    desc:'USB Type-C 16Pin 母座 贴片 沉板 防水',
    pkg:'SMD-16', packing:'1000pcs/Reel', dateCode:'2025+', qty:48000, moq:500, icon:'conn',
    quality:'全新原装', rohs:true, seller:'S06', leadtime:'现货',
    tiers:[{q:500,p:1.42},{q:5000,p:1.26},{q:20000,p:1.12},{q:45000,p:1.02}],
    specs:{'类型':'USB Type-C 母座','位数':'16 Pin','额定电流':'5 A','额定电压':'20 V','插拔寿命':'10,000 次','防护等级':'IPX8（防水）','安装方式':'SMD 沉板','工作温度':'-30°C ~ +85°C'}
  },
  {
    id:'P1023', mpn:'ADUM1201ARZ', brand:'ADI', cat:'集成电路 IC', sub:'接口芯片',
    desc:'双通道数字隔离器 2.5kV 25Mbps SOIC-8',
    pkg:'SOIC-8', packing:'1000pcs/Reel', dateCode:'2023+', qty:4200, moq:50, icon:'ic',
    quality:'全新原装', rohs:true, seller:'S05', leadtime:'现货',
    tiers:[{q:50,p:14.60},{q:500,p:13.20},{q:1500,p:12.10},{q:4000,p:11.30}],
    specs:{'通道数':'2（1 正向 + 1 反向）','隔离电压':'2500 V RMS','数据速率':'最高 25 Mbps','传输延时':'典型 20 ns','工作电压':'2.7 V ~ 5.5 V','封装':'SOIC-8 (窄体)','工作温度':'-40°C ~ +105°C'}
  },
  {
    id:'P1024', mpn:'LPC1768FBD100', brand:'NXP', cat:'集成电路 IC', sub:'微控制器 MCU',
    desc:'ARM Cortex-M3 MCU 512KB Flash 64KB RAM 100MHz LQFP-100（停产料·稀缺）',
    pkg:'LQFP-100', packing:'90pcs/Tray', dateCode:'2019+', qty:1080, moq:30, icon:'ic',
    quality:'原装库存料', rohs:true, seller:'S05', leadtime:'现货',
    tiers:[{q:30,p:78.00},{q:180,p:72.50},{q:540,p:68.00},{q:1080,p:64.00}],
    specs:{'内核':'ARM Cortex-M3','主频':'100 MHz','Flash':'512 KB','SRAM':'64 KB','以太网':'10/100 MAC','USB':'Device/Host/OTG','封装':'LQFP-100 (14×14mm)','状态':'原厂 NRND（不推荐新设计），市场稀缺','工作温度':'-40°C ~ +85°C'}
  }
];

/* ---------- 询价单 / 订单示例 ---------- */
const INQUIRIES = [
  { id:'RFQ2608070031', mpn:'STM32F103C8T6', brand:'STMicroelectronics', qty:5000, buyer:'杭州**智能科技', time:'10 分钟前', status:'待报价', quotes:0 },
  { id:'RFQ2608070028', mpn:'ESP32-WROOM-32E', brand:'Espressif', qty:2000, buyer:'深圳**物联网', time:'32 分钟前', status:'已报价', quotes:3 },
  { id:'RFQ2608070019', mpn:'TPS54331DR', brand:'Texas Instruments', qty:8000, buyer:'东莞**电子', time:'1 小时前', status:'议价中', quotes:5 },
  { id:'RFQ2608060142', mpn:'W25Q128JVSIQ', brand:'Winbond', qty:3000, buyer:'苏州**科技', time:'昨天', status:'已成交', quotes:4 },
  { id:'RFQ2608060098', mpn:'GD32F103RCT6', brand:'GigaDevice', qty:1500, buyer:'成都**仪器', time:'昨天', status:'已关闭', quotes:2 }
];

const ORDERS = [
  { id:'HT2608070006', mpn:'STM32F103C8T6', qty:5000, amt:39700, cp:'杭州**智能科技', pay:'平台担保', status:'待发货', statusTag:'tag-warn', time:'2026-08-07 09:12' },
  { id:'HT2608060021', mpn:'CL10A106MP8NNNC', qty:150000, amt:7080, cp:'深圳**电子', pay:'平台担保', status:'运输中', statusTag:'tag-blue', time:'2026-08-06 15:40' },
  { id:'HT2608050017', mpn:'AO3400A', qty:300000, amt:29400, cp:'东莞**科技', pay:'账期 30 天', status:'待收货确认', statusTag:'tag-blue', time:'2026-08-05 11:02' },
  { id:'HT2608020009', mpn:'SHT30-DIS-B2.5KS', qty:2500, amt:34500, cp:'宁波**传感', pay:'平台担保', status:'已完成', statusTag:'tag-ok', time:'2026-08-02 16:28' },
  { id:'HT2607280033', mpn:'IRF540NSTRLPBF', qty:3200, amt:16160, cp:'常州**动力', pay:'平台担保', status:'质保申诉中', statusTag:'tag-red', time:'2026-07-28 10:15' }
];

/* ---------- SVG 元件示意图（原型阶段替代真实产品图片） ---------- */
function compSVG(type, size){
  size = size || 90;
  const B='#1352A2', G='#5b6673', S='#c8d2de', O='#FF6B00';
  const body = {
    ic:`<rect x="22" y="26" width="56" height="48" rx="3" fill="#2b3440"/>
        <circle cx="31" cy="35" r="3.5" fill="#4a5766"/>
        <text x="54" y="56" font-size="9" fill="#8fa3bb" text-anchor="middle" font-family="monospace">IC</text>
        ${[0,1,2,3,4].map(i=>`<rect x="${28+i*11}" y="18" width="6" height="9" fill="${S}"/><rect x="${28+i*11}" y="73" width="6" height="9" fill="${S}"/>`).join('')}
        <rect x="13" y="32" width="9" height="6" fill="${S}"/><rect x="13" y="46" width="9" height="6" fill="${S}"/><rect x="13" y="60" width="9" height="6" fill="${S}"/>
        <rect x="78" y="32" width="9" height="6" fill="${S}"/><rect x="78" y="46" width="9" height="6" fill="${S}"/><rect x="78" y="60" width="9" height="6" fill="${S}"/>`,
    cap:`<rect x="26" y="36" width="48" height="28" rx="2" fill="#c8974a"/>
         <rect x="18" y="36" width="10" height="28" fill="${S}"/><rect x="72" y="36" width="10" height="28" fill="${S}"/>
         <rect x="26" y="36" width="48" height="6" fill="#dcae64"/>`,
    res:`<rect x="26" y="38" width="48" height="24" rx="2" fill="#2b2b2b"/>
         <rect x="18" y="38" width="10" height="24" fill="${S}"/><rect x="72" y="38" width="10" height="24" fill="${S}"/>
         <text x="50" y="54" font-size="10" fill="#e8e8e8" text-anchor="middle" font-family="monospace">103</text>`,
    mos:`<rect x="30" y="32" width="40" height="34" rx="3" fill="#2b3440"/>
         <rect x="34" y="66" width="6" height="14" fill="${S}"/><rect x="60" y="66" width="6" height="14" fill="${S}"/>
         <rect x="47" y="20" width="6" height="12" fill="${S}"/>
         <text x="50" y="53" font-size="8" fill="#8fa3bb" text-anchor="middle" font-family="monospace">Q</text>`,
    conn:`<rect x="16" y="34" width="68" height="30" rx="3" fill="#3a4552"/>
          <rect x="20" y="38" width="60" height="14" rx="2" fill="#1b222b"/>
          ${[0,1,2,3,4,5,6,7].map(i=>`<rect x="${23+i*7}" y="40" width="3" height="10" fill="#d4b25c"/>`).join('')}
          <rect x="20" y="64" width="60" height="5" fill="${S}"/>`,
    ind:`<rect x="24" y="30" width="52" height="40" rx="6" fill="#3b3b3b"/>
         <ellipse cx="50" cy="42" rx="20" ry="8" fill="#565656"/>
         <rect x="24" y="66" width="14" height="6" fill="${S}"/><rect x="62" y="66" width="14" height="6" fill="${S}"/>`,
    led:`<rect x="30" y="36" width="40" height="28" rx="2" fill="#f2f4f7" stroke="${S}"/>
         <circle cx="50" cy="50" r="10" fill="#fff8d6" stroke="#e8c94a"/>
         <rect x="22" y="40" width="9" height="20" fill="${S}"/><rect x="69" y="40" width="9" height="20" fill="${S}"/>
         <path d="M50 30 v-8 M62 38 l6 -6 M38 38 l-6 -6" stroke="${O}" stroke-width="2" stroke-linecap="round"/>`,
    xtal:`<rect x="24" y="34" width="52" height="32" rx="4" fill="#c3ccd6"/>
          <rect x="30" y="40" width="40" height="20" rx="2" fill="#8e9aa8"/>
          ${[0,1].map(i=>`<rect x="${26+i*44}" y="30" width="8" height="6" fill="#d4b25c"/><rect x="${26+i*44}" y="64" width="8" height="6" fill="#d4b25c"/>`).join('')}`,
    sensor:`<rect x="28" y="30" width="44" height="40" rx="4" fill="#eef1f5" stroke="${S}"/>
            <rect x="36" y="38" width="28" height="18" rx="2" fill="#2b3440"/>
            <circle cx="50" cy="47" r="4" fill="${B}"/>
            <path d="M50 62 q6 6 12 0 M50 66 q9 8 18 0" stroke="${O}" stroke-width="1.6" fill="none"/>`,
    module:`<rect x="14" y="24" width="72" height="52" rx="3" fill="#1e6b4a"/>
            <rect x="20" y="30" width="34" height="26" rx="2" fill="#4a5766"/>
            <path d="M60 32 h20 M60 36 h20 M60 40 h20 M60 44 h14" stroke="#d4b25c" stroke-width="2.4"/>
            ${[0,1,2,3,4,5,6,7,8].map(i=>`<rect x="${17+i*8}" y="76" width="5" height="5" fill="#d4b25c"/>`).join('')}`,
    sw:`<rect x="28" y="34" width="44" height="32" rx="3" fill="#2b3440"/>
        <circle cx="50" cy="50" r="9" fill="#c9d2dc"/>
        <rect x="24" y="38" width="6" height="8" fill="${S}"/><rect x="70" y="38" width="6" height="8" fill="${S}"/>
        <rect x="24" y="56" width="6" height="8" fill="${S}"/><rect x="70" y="56" width="6" height="8" fill="${S}"/>`
  };
  return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="none"/>${body[type]||body.ic}</svg>`;
}

/* ---------- 工具函数 ---------- */
const fmt = {
  qty: n => n.toLocaleString('zh-CN'),
  price: p => p < 1 ? '¥' + p.toFixed(4) : '¥' + p.toFixed(2),
  brandUrl: b => (BRANDS[b] && BRANDS[b].url) || '#',
  brandCn: b => (BRANDS[b] && BRANDS[b].cn) || b
};
function getProduct(id){ return PRODUCTS.find(p => p.id === id) || PRODUCTS[0]; }
function qs(k){ return new URLSearchParams(location.search).get(k); }
