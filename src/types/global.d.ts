// 申明 对象
declare type EmptyObjectType<T = any> = {
	[key: string]: T;
};

// 申明 数组
declare type EmptyArrayType<T = any> = T[];

