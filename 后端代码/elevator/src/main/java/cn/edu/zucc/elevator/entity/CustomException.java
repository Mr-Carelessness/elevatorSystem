package cn.edu.zucc.elevator.entity;

public class CustomException extends RuntimeException {
	private int code;
    public CustomException() {
        super();
    }
    public CustomException(String msg,int code) {
        super(msg);
        this.code=code;
    }
    public int getCode() {
        return code;
    }
}
