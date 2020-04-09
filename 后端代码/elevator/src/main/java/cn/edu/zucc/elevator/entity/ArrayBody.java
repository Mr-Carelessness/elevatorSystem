package cn.edu.zucc.elevator.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ArrayBody {
	//@JsonProperty(value = "arr")
	private Integer[] arr;

	public Integer[] getArr() {
		return arr;
	}

	public void setArr(String arr) {
		//System.out.println(arr.substring(1, arr.length()-1));
		String []a = arr.substring(1, arr.length()-1).split(",");
		Integer []b = new Integer[a.length];
		for(int i=0;i<a.length;i++) {
			b[i] = Integer.valueOf(a[i]);
		}
		this.arr = b;
	}
	
	
}
