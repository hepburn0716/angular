<div class="app-inner">
	<h1>创建新闻</h1>
	<form name="newss" ng-submit="submitNewsData()" class="form-horizontal">
		<div class="form-group">
			<label for="" class="col-lg-2 control-label">新闻标题：</label>
			<div class="col-lg-4"><input 
				type="text"
				placeholder="请输入新闻标题"
				ng-model="data.title"
				name="title"
				class="form-control"
				ng-required="true"
				autocomplete="off"
				></div>
				<div ng-show="newss.title.$pristine || newss.title.$valid" class="col-lg-6 text-danger control-label text-left">请输入新闻标题</div>
        </div>

		<div class="form-group">	
			<label for="" class="col-lg-2 control-label">新闻作者：</label>
			<div class="col-lg-4"><input 
				type="text"
				ng-required="true"
				placeholder="请输入新闻作者"
				ng-model="data.auto"
				autocomplete="off"
				name="auto"
				class="form-control"
				></div>
			<div ng-show="newss.auto.$pristine || newss.auto.$valid" class="col-lg-6 text-danger control-label text-left">请输入作者</div>
		</div>

		<div class="form-group">
			<label for="" class="col-lg-2 control-label">新闻简介：</label>
			<div class="col-lg-4">
				<textarea
				class="form-control"
				ng-required="true"
				placeholder="请输入内容"
				autocomplete="off"
				ng-model="data.content"
				name="content"
				></textarea>
			</div>
			<div ng-show="newss.content.$pristine || newss.content.$valid" class="col-lg-6 text-danger control-label text-left">请输入新闻内容</div>
		</div>

		<div class="form-grounp">
			<div class="col-lg-4 col-lg-offset-2"><button class="btn btn-success" ng-disabled="newss.$invalid" class="btn btn-success">提交</button></div>
		</div>
	</form>
</div>