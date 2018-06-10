import { Injectable } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';



declare var jQuery: any;
@Injectable()
export class UtilityService {
	constructor(private toastr: ToastsManager) { }
	toastrOptions: any = {
		showCloseButton: true,
		maxShown: 2,
		animate: 'flyRight',
		newestOnTop: true,
		toastLife: 3000,
		enableHTML: true
	}

	showModal(modalId: string) {
		return jQuery(modalId).modal('show');
	}
	hideModal(modalId: string) {
		return jQuery(modalId).modal('hide');
	}
	showSuccessToastr(toastrObject: any, title: string, bodyMsg: string, options?: any) {
		let toastrOptions = Object.assign({}, this.toastrOptions, options || {});
		return toastrObject.success(bodyMsg, title, toastrOptions);
	}
	showErrorToastr(toastrObject: any, title: string, bodyMsg: string, options?: any) {
		let toastrOptions = Object.assign({}, this.toastrOptions, options || {});
		return toastrObject.error(bodyMsg, title, toastrOptions);
	}
}