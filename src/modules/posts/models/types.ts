export interface BasePost {
  id: string;
  name: string;
  description: string;
  location: string;
  type: string;
  image?: string;
}

export interface EstatePost extends BasePost {
  type: 'Недвижимость';
  propertyType?: string;
  area?: number;
  rooms?: number;
  price?: number;
}

export interface AutoPost extends BasePost {
  type: 'Авто';
  brand?: string;
  model?: string;
  year?: number;
  mileage?: number;
}

export interface ServicesPost extends BasePost {
  type: 'Услуги';
  serviceType?: string;
  experience?: number;
  cost?: number;
  workSchedule?: string;
}

export type Post = EstatePost | AutoPost | ServicesPost;
