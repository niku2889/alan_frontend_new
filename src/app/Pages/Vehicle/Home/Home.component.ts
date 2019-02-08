import { Component, Input, Output, EventEmitter, OnInit, ViewChild, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmbryoService } from '../../../Services/Embryo.service';
import { HomeVehicleService } from './Home.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { environment } from '../../../../environments/environment';
import { MatSidenav, MatChipList, MatMenuTrigger } from "@angular/material";
declare var require: any
let category = require('./category.json');

@Component({
  selector: 'app-homevehicle',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.scss'],
  providers: [HomeVehicleService, MessageService]
})
export class HomeVehicleComponent implements OnInit {

  @ViewChild('drawer') drawer: MatSidenav;
  @ViewChild(MatMenuTrigger) menu: MatMenuTrigger;
  @ViewChild('chipList') chipList: MatChipList;

  navMode = 'side';
  type: any;
  pips: boolean = true;
  tooltips: boolean = true;
  category: any;
  pageTitle: string;
  subPageTitle: string;

  manufacturerData: any[] = [];
  modelData: any[] = [];
  engineData: any[] = [];
  yearData: any[] = [];
  ktypeData: any[] = [];
  categoryData: any[] = [];
  lapArtData: any[] = [];
  productData: any[] = [];
  yinYanData: any[] = [];
  imageData: any[] = [];
  isResult: boolean = false;
  isYinYan: boolean = false;
  isLoading: boolean = false;
  isLoading1: boolean = false;
  isReg: boolean = false;

  make: any;
  model: any;
  engine: any;
  year: any;
  regNo: any;
  filterCategory: any;
  filterBrand: any;

  vehicleForm: FormGroup;
  selected = new FormControl(0);
  public subscribers: any = {};
  imageURL = environment.imageURL;
  isSlider: boolean = true;
  sliderData: any[] = [];
  sCategory: string = '';
  isCategory: boolean = false;
  isProduct: boolean = false;
  filterpData: any[] = [];
  filterVData: any[] = [];
  noOfProducts: number = 0;
  isLoadAll: boolean = false;
  availableCategory: any[] = [];
  brandData: any[] = [];
  selectedBrand: any;
  filterArr = [];
  filterFinalData: any[] = [];
  filterLocationData: any[] = [];
  filterYinyanData: any[] = [];
  locationData: any[] = [];
  selectedLocation: any;
  isLocation: boolean = false;
  isMultiLocation: boolean = false;
  finalLocation: any;
  isOpen: boolean = false;
  tabLength: number = 0;
  tabIndex: number = 0;
  sum = 4;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  sliderImg = '../../assets/images/whitebg.jpg';
  direction = '';
  starData: any[] = [{ checked: false, value: 1 }, { checked: false, value: 2 }, { checked: false, value: 3 }, { checked: false, value: 4 }, { checked: false, value: 5 }]
  @Input() rating: number;
  @Input() itemId: number;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();
  filterCount: number = 0;
  inputName: string;
  pIndex: number = 0;
  private radioVal: string;
  shareUrl: string;
  masterData: any[] = [];
  isPriceView: number = 1;
  isOtherView: number = 0;
  isARefresh: boolean = true;
  isERefresh: boolean = true;
  filterCrossRef: any;
  filterOE: any;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private location: Location,
    private router: Router,
    public embryoService: EmbryoService,
    private service: HomeVehicleService, private titleService: Title, private meta: Meta
  ) {
    this.getHomeSlider();
    this.getCategoryImage();
    this.vehicleForm = new FormGroup({
      manufacturer: new FormControl('', [
        Validators.required
      ]),
      model: new FormControl('', [
        Validators.required
      ]),
      engine: new FormControl('', [
        Validators.required
      ]),
      year: new FormControl('', [
        Validators.required
      ]),
    });
    this.make = localStorage.getItem("make");
    this.model = localStorage.getItem("model");
    this.engine = localStorage.getItem("engine");
    this.year = localStorage.getItem("year");
    this.sCategory = localStorage.getItem("category");

    if (!this.make) {
      this.make = this.route.snapshot.params['make'] ? decodeURI(this.route.snapshot.params['make'].toString().replace(/-/g, ' ')) : '';
    }
    if (!this.model) {
      this.model = this.route.snapshot.params['model'] ? decodeURI(this.route.snapshot.params['model'].toString().replace(/-/g, ' ')) : '';
    }
    if (!this.engine) {
      this.engine = this.route.snapshot.params['engine'] ? decodeURI(this.route.snapshot.params['engine'].toString().replace(/-/g, ' ')) : '';
    }
    if (!this.year) {
      this.year = this.route.snapshot.params['year'] ? decodeURI(this.route.snapshot.params['year'].toString().replace(/-/g, ' ')) : '';
    }
    if (!this.sCategory) {
      this.sCategory = this.route.snapshot.params['description'] ? this.route.snapshot.params['description'].toString().replace(/-/g, ' ') : '';
    }
    if (!this.regNo)
      this.regNo = this.route.snapshot.params['regno'] ? this.route.snapshot.params['regno'] : '';

    console.log(this.regNo)
    if (this.regNo) {
      this.isReg = true;
      this.submitReg(false);
    } else {
      if (localStorage.getItem("reg") == 'true') {
        this.isReg = true;
        this.regNo = localStorage.getItem("regNo");
        this.submitReg(false);
      } else {
        this.isReg = false;
        this.getManufacturer();
        if (this.make)
          this.submit();
      }
    }
    this.getHomeSlider();

    let make = this.route.snapshot.params['make'];
    let model = this.route.snapshot.params['model'];
    let year = this.route.snapshot.params['year'];
    let engine = this.route.snapshot.params['engine'];
    let description = this.route.snapshot.params['description'];
    let regno = this.route.snapshot.params['regno'];

    this.meta.addTag({ name: 'author', content: 'Compare The Car Part' });
    this.meta.addTag({ name: 'keyword', content: 'Compare The Car Part, Car Part Comparison, Car Part Price Comparison, Cheap Car Parts, Find Vehicle Parts, Parts And Accessories' });

    if (make && model && engine && year && description) {
      this.meta.updateTag({ name: 'description', content: 'Find ' + description + 'for your ' + make + ' ' + model + ' ' + engine + ' ' + year + ' with our price comparison at Compare The Car Part' });
      this.setTitle(make + ' ' + model + ' ' + description);
    } else if (make && model && engine && year) {
      this.meta.updateTag({ name: 'description', content: 'Find your ' + make + ' ' + model + ' ' + engine + ' ' + year + ' with our price comparison at Compare The Car Part' });
      this.setTitle(make + ' ' + model);
    } else if (regno && description) {
      this.meta.updateTag({ name: 'description', content: 'Find your ' + regno + ' registration number with our price comparison at Compare The Car Part' });
      this.setTitle(description);
    } else if (regno) {
      this.meta.updateTag({ name: 'description', content: 'Find your ' + regno + ' registration number with our price comparison at Compare The Car Part' });
      this.setTitle(regno);
    } else {
      this.meta.updateTag({ name: 'description', content: "Compare The Car Part's mission is to simplify how car parts are organised, making ordering a car part as easy as ordering a coffee, well, maybe easier." });
      this.setTitle('Home - Compare the car part');
    }
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit() {
    if (window.innerWidth < 768) {
      this.navMode = 'over';
    }
    this.inputName = this.itemId + '_rating';
  }

  closeMenu1() {
    this.menu.closeMenu();
  }

  onClick(rating: number): void {
    this.rating = rating;
    this.ratingClick.emit({
      itemId: this.itemId,
      rating: rating
    });
  }

  stopClosing(event) {
    event.stopPropagation();
  }

  getManufacturer() {
    this.service.getManufacturer()
      .subscribe(data => {
        this.manufacturerData = data;
        this.manufacturerData.sort((a, b) => {
          if (a < b) return -1;
          else if (a > b) return 1;
          else return 0;
        });
        if (this.make)
          this.vehicleForm.controls['manufacturer'].setValue(this.make);
        if (this.model)
          this.changeManu(this.make, true)
      });
  }

  changeManu(event, flag) {
    this.modelData = [];
    this.engineData = [];
    this.yearData = [];
    this.vehicleForm.controls['model'].setValue('');
    this.vehicleForm.controls['engine'].setValue('');
    this.vehicleForm.controls['year'].setValue('');
    if (!flag)
      this.model = '';
    this.service.getModel(event)
      .subscribe(data => {
        this.modelData = data;
        if (this.modelData.length == 1) {
          this.vehicleForm.controls['model'].setValue(this.modelData);
          this.changeModel(this.modelData, true);
        }
        if (this.model) {
          this.vehicleForm.controls['model'].setValue(this.model);
          this.changeModel(this.model, true);
        }
      });
  }

  changeModel(event, flag) {
    this.engineData = [];
    this.yearData = [];
    this.vehicleForm.controls['engine'].setValue('');
    this.vehicleForm.controls['year'].setValue('');
    if (!flag)
      this.engine = '';
    let form = this.vehicleForm.value;
    this.service.getEngine(event, form.manufacturer)
      .subscribe(data => {
        this.engineData = data;
        if (this.engineData.length == 1) {
          this.vehicleForm.controls['engine'].setValue(this.engineData);
          this.changeEngine(this.engineData, true);
        }
        if (this.engine) {
          this.vehicleForm.controls['engine'].setValue(this.engine);
          this.changeEngine(this.engine, true)
        }
      });
  }

  changeEngine(event, flag) {
    this.yearData = [];
    this.vehicleForm.controls['year'].setValue('');
    if (!flag)
      this.year = '';
    let form = this.vehicleForm.value;
    this.service.getYear(event, form.manufacturer, form.model)
      .subscribe(data => {
        this.yearData = data;
        if (this.yearData.length == 1) {
          this.vehicleForm.controls['year'].setValue(this.yearData);
        }
        if (this.year) {
          this.vehicleForm.controls['year'].setValue(this.year);
          //this.submit();
        }
        this.yearData.sort((a, b) => {
          if (a > b) return -1;
          else if (a < b) return 1;
          else return 0;

        });
      });
  }

  changeYear(event) {
  }

  submit() {
    this.isReg = true;
    this.filterpData = [];
    this.filterFinalData = [];
    this.productData = [];
    this.noOfProducts = 0;

    this.isSlider = false;
    this.isLoading1 = true;
    this.isLoading = true;
    this.isCategory = false;
    this.isProduct = false;

    let form = this.vehicleForm.value;
    if (form.manufacturer != '') {
      this.sCategory = '';
      this.make = form.manufacturer;
      this.model = form.model;
      this.engine = form.engine;
      this.year = form.year;
      this.changeUrl(form.manufacturer, form.model, form.engine, form.year, '', '', '');
      this.getKtype(this.vehicleForm.value);
    } else {
      this.vehicleForm.controls['manufacturer'].setValue(this.make);
      this.vehicleForm.controls['model'].setValue(this.model);
      this.vehicleForm.controls['engine'].setValue(this.engine);
      this.vehicleForm.controls['year'].setValue(this.year);
      if (this.sCategory != '')
        this.selectedCategory(this.sCategory);
      else
        this.changeUrl(this.make, this.model, this.engine, this.year, '', '', '');
      this.getKtype(this.vehicleForm.value);
    }
  }

  async getAllProducts(category): Promise<any> {
    return new Promise((resolve, reject) => {
      this.service.getAllProducts(this.vehicleForm.value, category)
        .subscribe(data => {
          resolve(data)
        });
    });
  }

  getCategoryImage() {
    this.service.getCategoryImage()
      .subscribe(data => {
        this.categoryData = data;
      });
  }

  getHomeSlider() {
    this.service.getHomeSlider()
      .subscribe(data => {
        this.sliderData = data;
      });
  }

  getKtype(type) {
    this.service.getKtype(type)
      .subscribe(data => {
        this.ktypeData = data;
        this.getMaster(this.ktypeData[0], '');
        this.getLapArtId(this.ktypeData[0])
        this.getYinYan(this.ktypeData[0]);
      });
  }

  selectedCategory(category) {
    window.scrollTo(0, 0);
    this.pIndex = 0;
    this.filterCount = 0;
    this.tabIndex = 0;
    this.sum = 4;
    this.isCategory = false;
    this.sCategory = category;
    this.isProduct = true;
    this.isSlider = false;
    this.isLocation = false;
    this.isMultiLocation = false;
    this.locationData = [];
    this.isLoading = true;
    this.filterpData = [];
    this.filterFinalData = [];
    this.noOfProducts = 0;
    this.isResult = false;
    this.isYinYan = false;
    let yData = [];
    let form = this.vehicleForm.value;
    if (form.manufacturer != '') {
      localStorage.setItem("make", form.manufacturer);
      localStorage.setItem("model", form.model);
      localStorage.setItem("engine", form.engine);
      localStorage.setItem("year", form.year);

    }
    localStorage.setItem("category", category);
    this.filterFinalData = this.productData.filter(a => a.descriptions.toString().toLowerCase().indexOf(category.toLowerCase()) !== -1).slice(0, 4);
    this.noOfProducts = this.productData.filter(a => a.descriptions.toString().toLowerCase().indexOf(category.toLowerCase()) !== -1).slice(0, 4).length;
    this.filterpData = this.filterFinalData;
    if (this.filterpData.length > 0) {
      this.isLoadAll = true;
      this.isLoading = false;
      this.isResult = true;
      this.sortingPrductArray();
      this.getBrandSingle(this.filterpData[0].supBrand);
      this.changeUrlBrand(this.filterpData[0].supBrand, this.filterpData[0].artArticleNr)
    } else {
      const timer = setTimeout(() => {
        this.fisrtTry();
        clearTimeout(timer);
      }, 10000);
    }
    this.getBrand();
    if (this.sCategory == 'Brake Pad Set')
      yData = this.yinYanData.filter(a => a.mainCategory == 'Brake Pads');
    else
      yData = this.yinYanData.filter(a => a.mainCategory.toString().toLowerCase().indexOf(category.toString().toLowerCase()) !== -1);

    Array.from(new Set(yData.map((item: any) => item.location1))).forEach(e => {
      if (e != '')
        this.locationData.push(e)
    });
    console.log(this.locationData)
    if (this.locationData.length <= 1)
      this.isLocation = true;
    else
      this.isMultiLocation = true;
  }

  changeUrlBrand(brand, artNo) {
    if (this.regNo != '')
      this.changeVrmUrl(this.regNo, this.sCategory, brand, artNo);
    else
      this.changeUrl(this.make, this.model, this.engine, this.year, this.sCategory, brand, artNo);
  }

  viewAllCategory() {
    this.isPriceView = 1;
    this.isOtherView = 0;
    this.isProduct = false;
    this.isCategory = true;
    this.selectedLocation = '';
    this.finalLocation = '';
    this.filterpData = [];
    this.filterVData = [];
    this.isLocation = false;
    this.isMultiLocation = false;
    this.isYinYan = false;
    this.filterCount = 0;
    if (this.regNo != '')
      this.changeVrmUrl(this.regNo, '', '', '');
    else
      this.changeUrl(this.make, this.model, this.engine, this.year, '', '', '');
  }

  fisrtTry() {
    this.filterpData = [];
    this.filterFinalData = [];
    this.isLoadAll = true;
    this.isLoading = false;
    this.isResult = true;

    this.filterFinalData = this.productData.filter(a => a.descriptions.toString().toLowerCase().indexOf(this.sCategory.toLowerCase()) !== -1).slice(0, 4);
    this.noOfProducts = this.productData.filter(a => a.descriptions.toString().toLowerCase().indexOf(this.sCategory.toLowerCase()) !== -1).slice(0, 4).length;
    this.filterpData = this.filterFinalData;

    if (this.filterpData.length > 0) {
      this.getBrand();
      this.sortingPrductArray();
      this.getBrandSingle(this.filterpData[0].supBrand);
      this.changeUrl(this.make, this.model, this.engine, this.year, this.sCategory, this.filterpData[0].supBrand, this.filterpData[0].artArticleNr);
    } else {
      this.messageService.add({ severity: 'info', summary: 'Summary', detail: 'No parts available.' });
    }
  }

  showAllProducts() {
    window.scrollTo(0, 0);
  }

  async getCategory(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.service.getCategory()
        .subscribe(data => {
          resolve(data)
        });
    });
  }

  getLapArtId(ktype) {
    this.availableCategory = [];
    if (this.sCategory != '') {
      this.isCategory = false;
      this.isProduct = true;
    }
    else
      this.isCategory = true;
    if (this.categoryData.length == 0)
      this.categoryData = category;

    this.service.getLapArtId(ktype)
      .subscribe(data => {
        this.lapArtData = data;
        this.productData = [];
        if (this.lapArtData.length > 0) {
          for (let i = 0; i < this.lapArtData.length; i++) {
            let refine = '';
            if (this.lapArtData[i].mainCategory == 'Brake Discs')
              refine = 'Brake Disc';
            else if (this.lapArtData[i].mainCategory == 'Air Filters')
              refine = 'Air Filter';
            else if (this.lapArtData[i].mainCategory == 'Wiper Blades')
              refine = 'Wiper Blade';

            let searchCate = this.categoryData.filter(a => a.name.toString().indexOf(refine != '' ? refine : this.lapArtData[i].mainCategory) !== -1)
            if (searchCate.length > 0)
              this.availableCategory.push(searchCate[0]);

            if (i == (this.lapArtData.length - 1)) {
              this.availableCategory = this.availableCategory.filter(function (x, i, a) {
                return a.indexOf(x) == i;
              });
              this.isLoading1 = false;
              if (this.availableCategory.length == 0)
                this.messageService.add({ severity: 'info', summary: 'Summary', detail: 'No parts available.' });
            }
            let art = this.lapArtData[i].lapArtId.toString().split('\n');
            for (let j = 0; j < art.length; j++) {
              if (art[j] != '') {
                if (j <= 3) {
                  this.service.getProductDetails(art[j])
                    .subscribe(data1 => {
                      if (data1[0] != undefined) {
                        data1[0].category = this.yinYanData[i]._id;
                        if (data1[0].articleMediaFiles != undefined) {
                          let imgPath = data1[0].articleMediaFiles;
                          let str = imgPath.toString().replace(/\+/g, '%2B');
                          let str1 = str.toString().replace(/#/g, '%23');
                          let str2 = str1.toString().replace(/ /g, '+');
                          data1[0].articleMediaFiles = str2;
                        }
                        this.productData.push(data1[0])
                      }

                    });
                }
              }

            }
          }
        }
        else {
          this.isLoading1 = false;
        }
      });

    const timer = setTimeout(() => {
      this.downloadRemainProducts();
      if (this.sCategory != '') {
        this.selectedCategory(this.sCategory);
      }
      clearTimeout(timer);
    }, 10000);
    const timer1 = setTimeout(() => {
      this.downloadRemainProducts1();
      if (this.sCategory != '') {
        this.selectedCategory(this.sCategory);
      }
      clearTimeout(timer1);
    }, 20000);
  }

  downloadRemainProducts() {
    if (this.lapArtData.length > 0) {
      for (let i = 0; i < this.lapArtData.length; i++) {
        let art = this.lapArtData[i].lapArtId.toString().split('\n');
        for (let j = 0; j < art.length; j++) {
          if (art[j] != '') {
            if (j >= 4 && j <= 7) {
              this.service.getProductDetails(art[j])
                .subscribe(data1 => {
                  if (data1[0] != undefined) {
                    data1[0].category = this.yinYanData[i]._id;
                    if (data1[0].articleMediaFiles != undefined) {
                      let imgPath = data1[0].articleMediaFiles;
                      let str = imgPath.toString().replace(/\+/g, '%2B');
                      let str1 = str.toString().replace(/#/g, '%23');
                      let str2 = str1.toString().replace(/ /g, '+');
                      data1[0].articleMediaFiles = str2;
                    }
                    this.productData.push(data1[0])
                  }
                });
            }
          }
        }
      }
    }
  }

  downloadRemainProducts1() {
    if (this.lapArtData.length > 0) {
      for (let i = 0; i < this.lapArtData.length; i++) {
        let art = this.lapArtData[i].lapArtId.toString().split('\n');
        for (let j = 0; j < art.length; j++) {
          if (art[j] != '') {
            if (j >= 8) {
              this.service.getProductDetails(art[j])
                .subscribe(data1 => {
                  if (data1[0] != undefined) {
                    data1[0].category = this.yinYanData[i]._id;
                    if (data1[0].articleMediaFiles != undefined) {
                      let imgPath = data1[0].articleMediaFiles;
                      let str = imgPath.toString().replace(/\+/g, '%2B');
                      let str1 = str.toString().replace(/#/g, '%23');
                      let str2 = str1.toString().replace(/ /g, '+');
                      data1[0].articleMediaFiles = str2;
                    }
                    this.productData.push(data1[0])
                  }
                });
            }
          }
        }
      }
    }
  }

  async getProductDetails(art): Promise<any> {
    return new Promise((resolve, reject) => {
      this.service.getProductDetails(art)
        .subscribe(data => {
          resolve(data)
        });
    });
  }

  getYinYan(ktype) {
    this.locationData = [];
    this.service.getYinYan(ktype)
      .subscribe(data => {
        this.yinYanData = data;

      });
  }

  selectLocation(location) {
    this.pIndex = 0;
    this.selectedLocation = '  >  ' + location;
    this.finalLocation = location;
    this.filterpData = [];
    this.tabLength = 0;
    this.filterVData = [];
    this.noOfProducts = 0;
    let yinData = [];
    let locat: any[] = this.lapArtData.filter(a => a.location1 == this.finalLocation);
    this.isYinYan = true;
    this.filterLocationData = [];
    this.imageData = [];
    this.filterCount = 0;
    this.filterArr = [];

    if (locat.length > 0) {
      for (let x = 0; x < locat.length; x++) {
        let art = locat[x].lapArtId.toString().split('\n');
        for (let j = 0; j < art.length; j++) {
          if (art[j] != '') {
            let p: any[] = this.productData.filter(a => a.lapArtId.toString().indexOf(art[j].toString()) !== -1);
            if (p.length > 0)
              this.filterpData.push(p[0]);
          }
        }
        if (x == (locat.length - 1)) {
          if (this.sCategory == 'Brake Pad Set') {
            this.tabLength = this.yinYanData.filter(a => a.mainCategory == 'Brake Pads'
              && (a.location1 != '' ? a.location1.toString().toLowerCase().indexOf(this.finalLocation != '' ? this.finalLocation.toString().toLowerCase() : '') !== -1 : true)).length;
            yinData = this.yinYanData.filter(a => a.mainCategory == 'Brake Pads'
              && (a.location1 != '' ? (a.location1.toString().toLowerCase().indexOf(this.finalLocation != '' ? this.finalLocation.toString().toLowerCase() : '') !== -1) : true));
          }
          else {
            this.tabLength = this.yinYanData.filter(a => a.mainCategory.toString().toLowerCase().indexOf(this.sCategory.toString().toLowerCase()) !== -1
              && (a.location1 != '' ? a.location1.toString().toLowerCase().indexOf(this.finalLocation != '' ? this.finalLocation.toString().toLowerCase() : '') !== -1 : true)).length;
            yinData = this.yinYanData.filter(a => a.mainCategory.toString().toLowerCase().indexOf(this.sCategory.toString().toLowerCase()) !== -1
              && (a.location1 != '' ? (a.location1.toString().toLowerCase().indexOf(this.finalLocation != '' ? this.finalLocation.toString().toLowerCase() : '') !== -1) : true));
          }

          this.filterLocationData = this.filterpData.filter(a => a.category == yinData[0]._id && a.descriptions.toString().indexOf(this.sCategory) !== -1).slice(0, 4);
          this.filterVData = this.filterLocationData;
          this.noOfProducts = this.filterVData.length;
          this.getYinyanBrand();
          for (let i = 0; i < yinData.length; i++) {
            let img = this.productData.filter(a => a.category == yinData[i]._id && a.descriptions.toString().indexOf(this.sCategory) !== -1).slice(0, 1);
            this.imageData.push(img[0].articleMediaFiles)
          }
          this.sortingPrductArray();
          this.sortingPrductArray1();
        }
      }
    }
  }

  tabChange(event) {
    this.sum = 4;
    this.tabIndex = event.index;
    console.log(this.tabIndex)
    this.noOfProducts = 0;
    this.filterArr = [];
    this.filterVData = [];
    let yinData = [];
    this.filterYinyanData = [];
    this.filterCount = 0;
    this.pIndex = 0;

    if (this.sCategory == 'Brake Pad Set') {
      yinData = this.yinYanData.filter(a => a.mainCategory == 'Brake Pads'
        && (a.location1 != '' ? (a.location1.toString().toLowerCase().indexOf(this.finalLocation != '' ? this.finalLocation.toString().toLowerCase() : '') !== -1) : true));
    }
    else {
      yinData = this.yinYanData.filter(a => a.mainCategory.toString().toLowerCase().indexOf(this.sCategory.toString().toLowerCase()) !== -1
        && (a.location1 != '' ? (a.location1.toString().toLowerCase().indexOf(this.finalLocation != '' ? this.finalLocation.toString().toLowerCase() : '') !== -1) : true));
    }

    this.filterYinyanData = this.filterpData.filter(a => a.category == yinData[event.index]._id && a.descriptions.toString().indexOf(this.sCategory) !== -1).slice(0, 4);
    this.filterVData = this.filterYinyanData;
    this.noOfProducts = this.filterVData.length;
    this.getYinyanBrand();
    this.sortingPrductArray1();
    this.filterCrossRefData(this.sCategory, this.finalLocation);
    this.filterOEData(this.sCategory, this.finalLocation);
  }

  selectedChip(loc) {
    if (loc == this.finalLocation)
      return true;
    else
      return false;
  }

  async isAmazonPrice(ean, brand, articleNo, id, index, yin): Promise<any> {
    this.isARefresh = false;
    return new Promise((resolve, reject) => {
      if (ean.toString() != '') {
        let filean = ean.toString().split('\n');
        this.service.getProductPrice(filean[0], brand, articleNo)
          .subscribe(data1 => {
            let price: any = 'NA';
            let amazonLink: any = '';
            if (!data1) {
              this.isARefresh = true;
              this.messageService.add({ severity: 'info', summary: 'Summary', detail: 'Price updated' });
              resolve(true)
            } else {
              if (data1.length > 0) {
                price = (data1 != null && data1 != undefined) ? data1[0].OfferSummary[0] : 'NA';
                amazonLink = (data1 != null && data1 != undefined) ? data1[0].Offers[0] : '';
              }
              if (price != 'NA') {
                let fprice = price.LowestNewPrice ? price.LowestNewPrice[0].FormattedPrice[0] : 'NA';
                let famazonlink = amazonLink.MoreOffersUrl ? amazonLink.MoreOffersUrl[0] : '';
                if (yin) {
                  this.filterVData[index].price = fprice;
                  this.filterVData[index].amazonLink = famazonlink;
                } else {
                  this.filterpData[index].price = fprice;
                  this.filterpData[index].amazonLink = famazonlink;
                }
                this.service.updateProduct(id, fprice, famazonlink)
                  .subscribe(data => {
                  });
                this.isARefresh = true;
                this.messageService.add({ severity: 'info', summary: 'Summary', detail: 'Price updated' });
                resolve(true);
              } else {
                this.isARefresh = true;
                this.messageService.add({ severity: 'info', summary: 'Summary', detail: 'Price updated' });
                resolve(true)
              }
            }
          });
      } else {
        this.isARefresh = true;
        this.messageService.add({ severity: 'info', summary: 'Summary', detail: 'Price updated' });
        resolve(true)
      }
    });
  }


  async isEbayPrice(ean, id, index, yin): Promise<any> {
    this.isERefresh = false;
    return new Promise((resolve, reject) => {
      if (ean.toString() != '') {
        let filean = ean.toString().split('\n');
        this.service.getEbayPrice(filean[0])
          .subscribe(data1 => {
            if (data1) {
              let price = data1.itemSummaries ? data1.itemSummaries[0].price.value : 'NA';
              let link = data1.itemSummaries ? data1.itemSummaries[0].itemWebUrl : 'NA';
              if (yin) {
                this.filterVData[index].ebayPrice = price;
                this.filterVData[index].ebayLink = link;
              } else {
                this.filterpData[index].ebayPrice = price;
                this.filterpData[index].ebayLink = link;
              }
              this.service.updateEbayProduct(id, price, link)
                .subscribe(data => {
                });
            }
            this.isERefresh = true;
            this.messageService.add({ severity: 'info', summary: 'Summary', detail: 'Price Updated' });
            resolve(true);
          });
      } else {
        this.isERefresh = true;
        this.messageService.add({ severity: 'info', summary: 'Summary', detail: 'Price updated' });
        resolve(true)
      }
    });
  }

  getBrand() {
    this.brandData = [];
    let brand = {
      checked: false,
      name: ''
    }
    if (this.filterpData.length > 0) {
      Array.from(new Set(this.filterpData.map((item: any) => item.supBrand))).forEach(e => {
        brand = {
          checked: false,
          name: e
        }
        this.brandData.push(brand)
      });

      this.brandData.sort((a, b) => {
        if (a < b) return -1;
        else if (a > b) return 1;
        else return 0;
      });
    }
  }

  getYinyanBrand() {
    this.brandData = [];
    let brand = { checked: false, name: '' }
    if (this.filterVData.length > 0) {
      Array.from(new Set(this.filterVData.map((item: any) => item.supBrand))).forEach(e => {
        brand = {
          checked: false,
          name: e
        }
        this.brandData.push(brand)
      });
   
      this.brandData.sort((a, b) => {
        if (a < b) return -1;
        else if (a > b) return 1;
        else return 0;
      });
    }
  }

  getcategoryFilter(category) {
    if (category == 'Brake Pad Set') {
      return this.yinYanData.filter(a => a.mainCategory == 'Brake Pads'
        && (a.location1 != '' ? (a.location1.toString().toLowerCase().indexOf(this.finalLocation != '' ? this.finalLocation.toString().toLowerCase() : '') !== -1) : true));
    }
    else {
      return this.yinYanData.filter(a => a.mainCategory.toString().toLowerCase().indexOf(category.toString().toLowerCase()) !== -1
        && (a.location1 != '' ? (a.location1.toString().toLowerCase().indexOf(this.finalLocation != '' ? this.finalLocation.toString().toLowerCase() : '') !== -1) : true));
    }
  }

  viewMoreDetail(id, descriptions, lapArtId, brand, artArticalNr) {
    this.router.navigate(['', localStorage.getItem("make").toString().replace(/ /g, '-')
      , localStorage.getItem("model").toString().replace(/ /g, '-')
      , localStorage.getItem("engine").toString().replace(/ /g, '-')
      , localStorage.getItem("year").toString().replace(/ /g, '-')
      , descriptions.toString().replace(/ /g, '-')
      , lapArtId
      , brand.toString().replace(/ /g, '-')
      , artArticalNr.toString().replace(/ /g, '-')]);
  }

  submitRegEvent(event) {
    if (event.key == 'Enter') {
      this.submitReg(true);
    }
  }

  submitReg(flag) {
    if (this.regNo) {
      if (flag)
        this.sCategory = '';
      this.isLoading = true;
      this.isResult = false;
      this.isYinYan = false;
      this.isProduct = false;
      this.productData = [];
      this.filterpData = [];
      this.service.getVrmRegData(this.regNo)
        .subscribe(data => {
          if (data.length > 0) {
            this.isLoading = false;
            this.isReg = true;
            this.make = data[0].make;
            this.model = data[0].model;
            this.engine = data[0].engine;
            this.year = data[0].year;
            localStorage.setItem("make", data[0].make);
            localStorage.setItem("model", data[0].model);
            localStorage.setItem("engine", data[0].engine);
            localStorage.setItem("year", data[0].year);
            localStorage.setItem("reg", 'true');
            localStorage.setItem("ktype", data[0].ktype);
            localStorage.setItem("regNo", data[0].regno);
            this.changeVrmUrl(this.regNo, this.sCategory != '' ? this.sCategory : '', '', '');
            this.regData(data[0].ktype);
          } else {
            this.service.getClientIpAddress()
              .subscribe(dataip => {
                if (dataip) {
                  this.service.getClientIPCount(dataip.ip)
                    .subscribe(dataipcount => {
                      if (dataipcount != '') {
                        if (parseInt(dataipcount) < 4) {
                          this.service.getRegDetails(this.regNo)
                            .subscribe(data => {
                              if (data && data != 'data') {
                                let envelope: any[] = data['soap:Body'];
                                if (envelope.length > 0) {
                                  let error: any[] = envelope[0]['soap:Fault'];
                                  if (error != undefined) {
                                    let errmsg: any[] = error[0]['soap:Detail'];
                                    this.messageService.add({ severity: 'error', summary: 'Error', detail: errmsg[0].FindByRegistration[0].Error[0] });
                                    this.isLoading = false;
                                  } else {
                                    this.make = envelope[0].FindByRegistration[0].Vehicle[0].Make[0];
                                    this.model = envelope[0].FindByRegistration[0].Vehicle[0].Model[0];
                                    this.engine = envelope[0].FindByRegistration[0].Vehicle[0].FuelType[0] + ' ' + envelope[0].FindByRegistration[0].Vehicle[0].Power[0];
                                    this.year = envelope[0].FindByRegistration[0].Vehicle[0].FirstRegistrationDate[0];

                                    localStorage.setItem("make", this.make);
                                    localStorage.setItem("model", this.model);
                                    localStorage.setItem("engine", this.engine);
                                    localStorage.setItem("year", this.year);
                                    this.changeVrmUrl(this.regNo, this.sCategory != '' ? this.sCategory : '', '', '');
                                    let ktype = envelope[0].FindByRegistration[0].Vehicle[0].TecDoc_KTyp_No[0];
                                    this.isReg = true;
                                    if (ktype) {
                                      this.service.createVrmReg(this.regNo, ktype, this.make, this.model, this.engine, this.year)
                                        .subscribe(data => {
                                        });
                                      this.service.addClientIP(dataip.ip)
                                        .subscribe(data1 => {
                                        });
                                      this.regData(ktype);

                                      localStorage.setItem("reg", 'true');
                                      localStorage.setItem("ktype", ktype);
                                      localStorage.setItem("regNo", this.regNo);
                                    } else {
                                      this.isLoading = false;
                                      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Vehicle information not found.' });
                                    }
                                  }
                                } else {
                                  this.isLoading = false;
                                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Vehicle information not found.' });
                                }
                              }
                            });
                        } else {
                          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Your vehicle registration search limit exceeded. Please use vehicle selection process for parts.' });
                        }
                      } else {
                        this.service.getRegDetails(this.regNo)
                          .subscribe(data => {
                            if (data && data != 'data') {
                              let envelope: any[] = data['soap:Body'];
                              if (envelope.length > 0) {
                                let error: any[] = envelope[0]['soap:Fault'];
                                if (error != undefined) {
                                  let errmsg: any[] = error[0]['soap:Detail'];
                                  this.messageService.add({ severity: 'error', summary: 'Error', detail: errmsg[0].FindByRegistration[0].Error[0] });
                                  this.isLoading = false;
                                } else {
                                  this.make = envelope[0].FindByRegistration[0].Vehicle[0].Make[0];
                                  this.model = envelope[0].FindByRegistration[0].Vehicle[0].Model[0];
                                  this.engine = envelope[0].FindByRegistration[0].Vehicle[0].FuelType[0] + ' ' + envelope[0].FindByRegistration[0].Vehicle[0].Power[0];
                                  this.year = envelope[0].FindByRegistration[0].Vehicle[0].FirstRegistrationDate[0];

                                  localStorage.setItem("make", this.make);
                                  localStorage.setItem("model", this.model);
                                  localStorage.setItem("engine", this.engine);
                                  localStorage.setItem("year", this.year);

                                  let ktype = envelope[0].FindByRegistration[0].Vehicle[0].TecDoc_KTyp_No[0];
                                  this.isReg = true;
                                  if (ktype) {
                                    this.service.createVrmReg(this.regNo, ktype, this.make, this.model, this.engine, this.year)
                                      .subscribe(data => {
                                      });
                                    this.service.addClientIP(dataip.ip)
                                      .subscribe(data1 => {
                                      });
                                    this.regData(ktype);

                                    localStorage.setItem("reg", 'true');
                                    localStorage.setItem("ktype", ktype);
                                    localStorage.setItem("regNo", this.regNo);
                                  } else {
                                    this.isLoading = false;
                                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Vehicle information not found.' });
                                  }
                                }
                              } else {
                                this.isLoading = false;
                                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Vehicle information not found.' });
                              }
                            }
                          });
                      }
                    });
                } else {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unexpected error' });
                }
              });
          }
        });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please provide registration no.' });
    }
  }

  resetVehicle() {
    this.isReg = false;
    localStorage.clear();
    this.vehicleForm.reset();
    this.getManufacturer();
    window.location.href = '';
  }

  async getAllProductsKtype(ktype): Promise<any> {
    return new Promise((resolve, reject) => {
      this.service.getAllProductsKtype(ktype)
        .subscribe(data => {
          resolve(data)
        });
    });
  }

  regData(ktype) {
    this.isSlider = false;
    this.isLoading = true;
    this.isLoading1 = true;
    this.isCategory = false;

    this.getMaster(ktype, '');
    this.getLapArtId(ktype);
    this.getYinYan(ktype);

  }

  updateFilter(brand, event) {
    this.noOfProducts = 0;
    if (event.checked) {
      this.filterArr.push(brand)
    }
    else {
      let index = this.filterArr.indexOf(brand)
      this.filterArr.splice(index, 1)
    }
    this.filterpData = [];
    this.filterpData = this.filterFinalData.filter(a => {
      return this.filterArr.length ?
        this.filterArr.indexOf(a.supBrand) != -1 : this.filterFinalData;
    })
    this.noOfProducts = this.filterpData.length;
    this.filterCount = this.filterArr.length;
    this.sortingPrductArray();
  }

  updateFilterVarient(brand, event) {
    this.filterVData = [];
    this.noOfProducts = 0;
    if (event.checked) {
      this.filterArr.push(brand)
    }
    else {
      let index = this.filterArr.indexOf(brand)
      this.filterArr.splice(index, 1)
    }
    if (this.filterYinyanData.length > 0) {
      this.filterVData = this.filterYinyanData.filter(a => {
        return this.filterArr.length ?
          (this.filterArr.indexOf(a.supBrand) != -1) : this.filterYinyanData;
      })
    }
    else {
      this.filterVData = this.filterLocationData.filter(a => {
        return this.filterArr.length ?
          (this.filterArr.indexOf(a.supBrand) != -1) : this.filterLocationData;
      })
    }
    this.noOfProducts = this.filterVData.length;
    this.filterCount = this.filterArr.length;
    this.sortingPrductArray1();
  }

  clearBrand() {
    this.filterCount = 0;
    this.noOfProducts = 0;
    this.filterArr = [];
    this.filterpData = [];
    this.filterpData = this.filterFinalData;
    this.getBrand();
    this.noOfProducts = this.filterpData.length;
    this.sortingPrductArray();
  }

  clearBrandVarient() {
    this.filterCount = 0;
    this.noOfProducts = 0;
    this.filterArr = [];
    this.filterVData = [];
    if (this.filterYinyanData.length > 0) {
      this.filterVData = this.filterYinyanData;
    }
    else {
      this.filterVData = this.filterLocationData;
    }
    this.noOfProducts = this.filterVData.length;
    this.getYinyanBrand();
    this.sortingPrductArray1();
  }

  changeUrl(make, model, engine, year, category, brand, artNo) {
    if (make) {
      let mn = encodeURI(make.toString());
      let md = encodeURI(model.toString());
      let en = encodeURI(engine.toString());
      let yr = encodeURI(year.toString());
      let url = '';

      if (category != '') {
        if (brand != '') {
          url = '/' + mn.replace(/[/]/g, '%2F').replace(/%20/g, '-').replace(/[(]/g, '%28').replace(/[)]/g, '%29') +
            '/' + md.replace(/[/]/g, '%2F').replace(/%20/g, '-').replace(/[(]/g, '%28').replace(/[)]/g, '%29') +
            '/' + en.replace(/[/]/g, '%2F').replace(/%20/g, '-').replace(/[(]/g, '%28').replace(/[)]/g, '%29') +
            '/' + yr.replace(/[/]/g, '%2F').replace(/%20/g, '-').replace(/[(]/g, '%28').replace(/[)]/g, '%29') +
            '/' + category.replace(/ /g, '-') + '/' + brand + '/' + artNo;

          this.meta.updateTag({ name: 'description', content: 'Find ' + brand + ' ' + category + ' ' + artNo + ' for your ' + make + ' ' + model + ' ' + engine + ' ' + year + ' with our price comparison at Compare The Car Part' });
          this.setTitle(make + ' ' + model + ' ' + brand + ' ' + category + ' ' + artNo);
        } else {
          url = '/' + mn.replace(/[/]/g, '%2F').replace(/%20/g, '-').replace(/[(]/g, '%28').replace(/[)]/g, '%29') +
            '/' + md.replace(/[/]/g, '%2F').replace(/%20/g, '-').replace(/[(]/g, '%28').replace(/[)]/g, '%29') +
            '/' + en.replace(/[/]/g, '%2F').replace(/%20/g, '-').replace(/[(]/g, '%28').replace(/[)]/g, '%29') +
            '/' + yr.replace(/[/]/g, '%2F').replace(/%20/g, '-').replace(/[(]/g, '%28').replace(/[)]/g, '%29') +
            '/' + category.replace(/ /g, '-');

          this.meta.updateTag({ name: 'description', content: 'Find ' + category + ' for your ' + make + ' ' + model + ' ' + engine + ' ' + year + ' with our price comparison at Compare The Car Part' });
          this.setTitle(make + ' ' + model + ' ' + category);
        }

      } else {
        url = '/' + mn.replace(/[/]/g, '%2F').replace(/%20/g, '-').replace(/[(]/g, '%28').replace(/[)]/g, '%29') +
          '/' + md.replace(/[/]/g, '%2F').replace(/%20/g, '-').replace(/[(]/g, '%28').replace(/[)]/g, '%29') +
          '/' + en.replace(/[/]/g, '%2F').replace(/%20/g, '-').replace(/[(]/g, '%28').replace(/[)]/g, '%29') +
          '/' + yr.replace(/[/]/g, '%2F').replace(/%20/g, '-').replace(/[(]/g, '%28').replace(/[)]/g, '%29');

        this.meta.updateTag({ name: 'description', content: 'Find your ' + make + ' ' + model + ' ' + engine + ' ' + year + ' with our price comparison at Compare The Car Part' });
        this.setTitle(make + ' ' + model);
      }
      this.shareUrl = 'http://comparethecarpart.com' + url;
      this.location.replaceState(url);
    }
  }

  changeVrmUrl(vrm, category, brand, artNo) {
    if (vrm) {
      let url = '';

      if (category != '') {
        if (brand != '') {
          url = '/' + vrm +
            '/' + category.replace(/ /g, '-') + '/' + brand;

          this.meta.updateTag({ name: 'description', content: 'Find ' + brand + ' ' + category + ' ' + artNo + ' for your ' + vrm + ' with our price comparison at Compare The Car Part' });
          this.setTitle(brand + ' ' + category + ' ' + artNo);
        } else {
          url = '/' + vrm +
            '/' + category.replace(/ /g, '-');
          this.setTitle(category);
          this.meta.updateTag({ name: 'description', content: 'Find your ' + vrm + ' registration number with our price comparison at Compare The Car Part' });
        }

      } else {
        url = '/' + vrm;
        this.setTitle(vrm);
        this.meta.updateTag({ name: 'description', content: 'Find your ' + vrm + ' registration number with our price comparison at Compare The Car Part' });
      }

      this.shareUrl = 'http://comparethecarpart.com' + url;
      this.location.replaceState(url);
    }
  }

  onScrollDown() {
    this.menu.closeMenu();
    if (this.filterArr.length == 0) {
      this.sum += 4;
      this.filterpData = [];
      this.filterFinalData = [];

      this.noOfProducts = 0;
      this.filterFinalData = this.productData.filter(a => a.descriptions.toString().toLowerCase().indexOf(this.sCategory.toLowerCase()) !== -1).slice(0, this.sum);
      this.noOfProducts = this.productData.filter(a => a.descriptions.toString().toLowerCase().indexOf(this.sCategory.toLowerCase()) !== -1).slice(0, this.sum).length;
      this.filterpData = this.filterFinalData;
      this.direction = 'down';
      this.getBrand();
      this.sortingPrductArray();
    }
  }

  onScrollDownVarient() {
    this.menu.closeMenu();
    if (this.filterArr.length == 0) {
      this.sum += 4;
      this.noOfProducts = 0;
      let yinData = [];
      this.filterVData = [];

      if (this.sCategory == 'Brake Pad Set') {
        yinData = this.yinYanData.filter(a => a.mainCategory == 'Brake Pads'
          && (a.location1 != '' ? (a.location1.toString().toLowerCase().indexOf(this.finalLocation != '' ? this.finalLocation.toString().toLowerCase() : '') !== -1) : true));
      }
      else {
        yinData = this.yinYanData.filter(a => a.mainCategory.toString().toLowerCase().indexOf(this.sCategory.toString().toLowerCase()) !== -1
          && (a.location1 != '' ? (a.location1.toString().toLowerCase().indexOf(this.finalLocation != '' ? this.finalLocation.toString().toLowerCase() : '') !== -1) : true));
      }

      if (this.filterYinyanData.length > 0) {
        this.filterYinyanData = [];
        this.filterYinyanData = this.productData.filter(a => a.category == yinData[this.tabIndex]._id && a.descriptions.toString().indexOf(this.sCategory) !== -1).slice(0, this.sum);
        this.filterVData = this.filterYinyanData;
        this.noOfProducts = this.filterVData.length;
      }
      else {
        this.filterLocationData = [];
        this.filterLocationData = this.productData.filter(a => a.category == yinData[this.tabIndex]._id && a.descriptions.toString().indexOf(this.sCategory) !== -1).slice(0, this.sum);
        this.filterVData = this.filterLocationData;
        this.noOfProducts = this.filterVData.length;
      }
      this.getYinyanBrand()
      this.direction = 'down';
      this.sortingPrductArray1();
    }
  }

  sortingPrductArray() {
    this.filterpData.sort((a, b) => {
      if (a.price > b.price) return -1;
      else if (a.price < b.price) return 1;
      else return 0;

    });
    this.radioVal = this.filterpData.length > 0 ? this.filterpData[this.pIndex]._id : 0;
    let fcate = this.categoryData.filter(a => a.name == this.sCategory);
    this.filterCategory = fcate.length > 0 ? fcate[0].description : '';
  }

  sortingPrductArray1() {
    this.filterVData.sort((a, b) => {
      if (a.price > b.price) return -1;
      else if (a.price < b.price) return 1;
      else return 0;

    });
    this.radioVal = this.filterVData.length > 0 ? this.filterVData[this.pIndex]._id : 0;
    let fcate = this.categoryData.filter(a => a.name == this.sCategory);
    this.filterCategory = fcate.length > 0 ? fcate[0].description : '';
  }

  radioChange(event, id, i, lapArtId) {
    this.pIndex = i;
    this.radioVal = id;
    this.isPriceView = 0;
    this.isOtherView = 1;
    if (this.regNo != '')
      this.changeVrmUrl(this.regNo, this.sCategory, this.filterpData[i].supBrand, this.filterpData[i].artArticleNr);
    else
      this.changeUrl(this.make, this.model, this.engine, this.year, this.sCategory, this.filterpData[i].supBrand, this.filterpData[i].artArticleNr);
  }

  public isRadioSelected(value: any) {
    return (this.radioVal === value);
  }

  priceView() {
    this.isPriceView = 0;
  }

  setStep(index: number) {
    this.isPriceView = index;
  }

  setStep1(index: number) {
    this.isOtherView = index;
  }

  setStep2(index: number) {
    this.isOtherView = index;
  }

  getMaster(ktype, artId) {
    this.service.getMaster(ktype, artId)
      .subscribe(data => {
        this.masterData = data;
      });
  }

  filterCrossRefData(category: string, location: string) {
    let refine = '';
    let cross: any[];
    if (category == 'Brake Disc')
      refine = 'Brake Discs';
    else if (category == 'Air Filter')
      refine = 'Air Filters';
    else if (category == 'Wiper Blade')
      refine = 'Wiper Blades';
    if (location == '')
      cross = this.masterData.filter(a => a.mainCategory.toString().indexOf(refine != '' ? refine : category) !== -1);
    else {
      let yin: any[] = this.yinYanData.filter(a => a.mainCategory.toString().indexOf(refine != '' ? refine : category) !== -1 && (a.location1 == location));
      let yFilter = yin.length > 0 ? yin[this.tabIndex].yinYan : '';
      if (yFilter != '')
        cross = this.masterData.filter(a => a.mainCategory.toString().indexOf(refine != '' ? refine : category) !== -1 && (a.location1 == location) && (a.yinYan == yFilter));
      else
        cross = this.masterData.filter(a => a.mainCategory.toString().indexOf(refine != '' ? refine : category) !== -1 && (a.location1 == location));
    }
    this.filterCrossRef = cross.length > 0 ? cross[0].crossRefAftermarket : '';
    return cross.length > 0 ? cross[0].crossRefAftermarket : '';
  }



  filterOEData(category: string, location: string) {
    let refine = '';
    let oe: any[];
    if (category == 'Brake Disc')
      refine = 'Brake Discs';
    else if (category == 'Air Filter')
      refine = 'Air Filters';
    else if (category == 'Wiper Blade')
      refine = 'Wiper Blades';

    if (location == '')
      oe = this.masterData.filter(a => a.mainCategory.toString().indexOf(refine != '' ? refine : category) !== -1);
    else {
      let yin: any[] = this.yinYanData.filter(a => a.mainCategory.toString().indexOf(refine != '' ? refine : category) !== -1 && (a.location1 == location));
      let yFilter = yin.length > 0 ? yin[this.tabIndex].yinYan : '';
      if (yFilter != '')
        oe = this.masterData.filter(a => a.mainCategory.toString().indexOf(refine != '' ? refine : category) !== -1 && (a.location1 == location) && (a.yinYan == yFilter));
      else
        oe = this.masterData.filter(a => a.mainCategory.toString().indexOf(refine != '' ? refine : category) !== -1 && (a.location1 == location));
    }
    this.filterOE = oe.length > 0 ? oe[0].oePartNos : '';
    return oe.length > 0 ? oe[0].oePartNos : '';
  }

  filterCategoryData(category: string) {
    return category && category.replace(/{vehicle}/g, this.make + ' ' + this.model);
  }

  filterBrandData(brand: string) {
    return brand && brand.replace(/{brand}/g, this.filterpData[this.pIndex].supBrand);
  }

  filterBrandData1(brand: string) {
    return brand && brand.replace(/{brand}/g, this.filterVData[this.pIndex].supBrand);
  }

  getBrandSingle(brand) {
    this.service.getBrand(brand)
      .subscribe(data => {
        if (data.length > 0)
          this.filterBrand = data[0].description;
      });
  }
}
