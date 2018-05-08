<!-- div.app-inner>h1+form.form-horizontal>(div.form-group>label.col-lg-2.control-label+(div.col-lg-4>input.form-control)+div.col-lg-6.text-danger.control-label.text-left)*5+div.form-group>div.col-lg-4.col-lg-offset-4>button.btn.btn-success{提交} -->
<div class="app-inner">
	<h1>创建用户</h1>
	<!-- 2 设置name -->
	<!-- 7 绑定事件 -->
	<form name="regist" ng-submit="submitRegistData()" class="form-horizontal">
		<div class="form-group">
			<label for="" class="col-lg-2 control-label">用户名：</label>
			<!-- 1 绑定数据 -->
			<!-- 3 子元素设置name -->
			<!-- 4 设置条件 -->
			<div class="col-lg-4"><input 
				type="text" 
				class="form-control"
				placeholder="请输入用户名" 
				autocomplete="off" 
				ng-model="data.username"
				name="username" 
				ng-required="true" 
				ng-pattern="/^[a-zA-Z].{5,7}$/"
			></div>
			<!-- 5 显隐提示 -->
			<!-- 用户名输入过 并且 不合法 显示 -->
			<div ng-show="regist.username.$dirty && regist.username.$invalid" class="col-lg-6 text-danger control-label text-left">用户名字母开头，6-8位</div>
		</div>
		<div class="form-group">
			<label for="" class="col-lg-2 control-label">密 码：</label>
			<div class="col-lg-4"><input 
				type="text" 
				class="form-control"
				placeholder="请输入密码" 
				autocomplete="off" 
				ng-model="data.password"
				name="password" 
				ng-required="true"
				ng-pattern="/[a-zA-Z]+.*\d+|\d+.*[a-zA-Z]+/"
				ng-minlength="6"
				ng-maxlength="10"
			></div>
			<!-- 密码输入过 并且 不合法 显示 -->
			<div ng-show="regist.password.$dirty && regist.password.$invalid" class="col-lg-6 text-danger control-label text-left">密码包含字母、数字,6到10位</div>
		</div>
		<div class="form-group">
			<label for="" class="col-lg-2 control-label">电&emsp;话：</label>
			<div class="col-lg-4"><input 
				type="text" 
				class="form-control"
				placeholder="请输入电话号码" 
				autocomplete="off" 
				ng-model="data.tel"
				name="tel" 
				ng-required="true"
				ng-pattern="/^\d{3}-\d{8}$|^\d{4}-\d{7}$/"
			></div>
			<!-- 电话未输入 或者 合法  隐藏 -->
			<div ng-hide="regist.tel.$pristine || regist.tel.$valid" class="col-lg-6 text-danger control-label text-left">电话例如：010-12345678， 0123-1234567</div>
		</div>
		<div class="form-group">
			<label for="" class="col-lg-2 text-right">性 别：</label>
			<div class="col-lg-4">
				<!-- 一组单选框，绑定同一份数据 -->
				<label>男: <input type="radio" ng-model="data.sex" name="sex" value="man"></label>&emsp;
				<label>女：<input type="radio" ng-model="data.sex" name="sex" value="woman"></label>
			</div>
			<div class="col-lg-6 text-danger control-label text-left"></div>
		</div>
		<div class="form-group">
			<label for="" class="col-lg-2 control-label">简 介：</label>
			<div class="col-lg-4">
				<textarea 
					class="form-control"
					placeholder="请输入简介" 
					ng-model="data.intro"
					name="intro"
					ng-required="true"
				></textarea>
			</div>
			<!-- 输入过 并且 不合法 显示 -->
			<div ng-show="regist.intro.$dirty && regist.intro.$invalid" class="col-lg-6 text-danger control-label text-left">简介必填</div>
		</div>
		<div class="form-group">
			<!-- 6 控制按钮 -->
			<!-- 表单不合法被禁用 -->
			<div class="col-lg-4 col-lg-offset-2"><button ng-disabled="regist.$invalid" class="btn btn-success">提交</button></div>
		</div>
	</form>
</div>